package main

import (
	"fmt"
	"image"
	"image/draw"
	"image/png"
	"os"
)

func main() {
	src := "../../huge-images/TREE-9526x13134.png"
	dest := "../../huge-images/TREE-66682x26268.png"
	if err := process(src, dest, 7, 2); err != nil {
		fmt.Fprintf(os.Stderr, "Error %v \n", err)
	}
}

func process(src, dest string, rx, ry int) error {
	imgSrc, err := getImage(src)
	if err != nil {
		return err
	}

	w := imgSrc.Config.Width
	h := imgSrc.Config.Height

	imgDest := image.NewRGBA(image.Rect(0, 0, w*rx, h*ry))

	for y := 0; y < ry; y++ {
		for x := 0; x < rx; x++ {
			rect := image.Rect(w*x, h*y, w*(x+1)-1, h*(y+1)-1)
			draw.Draw(imgDest, rect, imgSrc.Image, image.Point{0, 0}, draw.Over)
		}
	}

	destFile, err := os.Create(dest)
	if err != nil {
		return err
	}
	defer destFile.Close()
	if err := png.Encode(destFile, imgDest); err != nil {
		return err
	}
	return nil
}

type Img struct {
	Image      image.Image
	Config     *image.Config
	FormatName string
}

// path: input image file path
func getImage(path string) (*Img, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	img, _, err := image.Decode(file)
	if err != nil {
		return nil, err
	}

	file.Seek(0, 0)

	config, formatName, err := image.DecodeConfig(file)
	if err != nil {
		return nil, err
	}

	return &Img{
		Image:      img,
		Config:     &config,
		FormatName: formatName,
	}, nil
}
