package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"

	"cloud.google.com/go/storage"
)

func main() {
	http.HandleFunc("/", indexHandler)

	// [START setting_port]
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Printf("Defaulting to port %s", port)
	}

	log.Printf("Listening on port %s", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}

const (
	bucketName = "osd-viewer-example2"
	prefix     = "osd-viewer-example2/"
)

func indexHandler(w http.ResponseWriter, req *http.Request) {
	ctx := req.Context()
	client, err := storage.NewClient(ctx)
	if err != nil {
		http.Error(w, "Failed to create client", http.StatusInternalServerError)
		return
	}

	path := strings.Replace(req.URL.Path, "/", "", 1)
	path = strings.Replace(path, prefix, "", 1)
	fmt.Printf("req.URL.Path: %s, path: %s \n", req.URL.Path, path)
	obj := client.Bucket(bucketName).Object(path)
	if attrs, err := obj.Attrs(ctx); err != nil {
		if err == storage.ErrObjectNotExist {
			fmt.Printf("object does not exist %s\n", path)
			http.NotFound(w, req)
			return
		} else {
			http.Error(w, fmt.Sprintf("Failed to get object attributes %+v", err), http.StatusInternalServerError)
			return
		}
	} else {
		w.Header().Add("Content-Type", attrs.ContentType)
	}

	if r, err := obj.NewReader(ctx); err != nil {
		http.Error(w, fmt.Sprintf("Failed to get object reader %+v", err), http.StatusInternalServerError)
		return
	} else {
		defer r.Close()
		if _, err := io.Copy(w, r); err != nil {
			http.Error(w, fmt.Sprintf("Failed to get object reader %+v", err), http.StatusInternalServerError)
			return
		}
	}

}
