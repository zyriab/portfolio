copy_env_files() {
  src_dir="$1"
  dest_dir="$2"

  # Loop through each file/directory in the source directory
  for file in "$src_dir"/*; do
    if [ -d "$file" ]; then
      # If the item is a directory, recursively call the function on it
      copy_env_files "$file" "$dest_dir/${file#$src_dir/}"
    elif [[ "$file" == *.env* ]]; then
      # If the item is a .env* file, copy it to the destination directory while maintaining the directory structure
      mkdir -p "$dest_dir/${file%/*}"
      cp "$file" "$dest_dir/${file#$src_dir/}"
    fi
  done
}
