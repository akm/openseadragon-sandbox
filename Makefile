# 1. huge-images/TREE-9526x13134.png を準備
# 2. make public/tiles/tree1 でタイル画像を生成
SOURCE_FILE_TREE1=huge-images/TREE-9526x13134.png
PUBLIC_TILES_DIR_TREE1=public/tiles/tree1

$(PUBLIC_TILES_DIR_TREE1):
	# https://github.com/dblock/dzt
	# gem install dzt
	dzt slice $(SOURCE_FILE_TREE1) --output=$(PUBLIC_TILES_DIR_TREE1)
