## Openseadragon Sandbox

## How to show an huge image

1. Make or get tile files from somewhere
2. Make .dzi file
3. Make symbolic links to them
   ```
   $ cd public/tiles
   $ ln -s path/to/image.dzi target.dzi
   $ ln -s path/to/image_files target_files
   $ cd -
   ```
4. Start server
   ```
   $ yarn start
   ```
5. Open http://localhost:3000 and you can see it
