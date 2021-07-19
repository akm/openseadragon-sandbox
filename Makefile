# 1. huge-images/TREE-9526x13134.png を準備
# 2. make public/tiles/tree1 でタイル画像を生成
SOURCE_FILE_TREE1=huge-images/TREE-9526x13134.png
PUBLIC_TILES_DIR_TREE1=public/tiles/tree1

MAGICK_SLICER_DIR=tmp/MagickSlicer
MAGICK_SLICER_BIN=$(MAGICK_SLICER_DIR)/magick-slicer.sh

$(MAGICK_SLICER_BIN):
	git clone https://github.com/VoidVolker/MagickSlicer.git $(MAGICK_SLICER_DIR)

$(PUBLIC_TILES_DIR_TREE1): $(MAGICK_SLICER_BIN)
	$(MAGICK_SLICER_BIN) -i $(SOURCE_FILE_TREE1) -o $(PUBLIC_TILES_DIR_TREE1)


PUBLIC_IMAGES_DIR=public/images
SOURCE_IMAGES_DIR=node_modules/openseadragon/build/openseadragon/images
$(PUBLIC_IMAGES_DIR):
	cp -r $(SOURCE_IMAGES_DIR) $(PUBLIC_IMAGES_DIR)

.PHONY: build
build:
	yarn build

clear:
	rm -rf $(BUILD_DIR)

.PHONY: rebuild
rebuild: clear $(PUBLIC_IMAGES_DIR) $(PUBLIC_TILES_DIR_TREE1) build


GCS_BUCKET_NAME=osd-viewer-example1

.PHONY: deploy
deploy:
	gsutil -m rsync -R -u build/ gs://$(GCS_BUCKET_NAME)

.PHONY: setup-iam
setup-iam:
	gsutil iam ch allUsers:objectViewer gs://$(GCS_BUCKET_NAME)
