import os

def traverse_directory(root_dir):
    sprite_map = {}

    for dirpath, _, filenames in os.walk(root_dir):
        folder_name = os.path.basename(dirpath)
        sprite_paths = [os.path.join(dirpath, filename) for filename in filenames]
        sprite_map[folder_name] = sprite_paths

    return sprite_map

def generate_js_file(sprite_map, output_file):
    with open(output_file, 'w') as f:
        f.write('const spriteMap = {\n')
        for folder_name, sprite_paths in sprite_map.items():
            if folder_name == "sprites":
                continue
            f.write(f"  '{folder_name}': [\n")
            for path in sprite_paths:
                f.write(f"    '{path}',\n")
            f.write('  ],\n')
        f.write('};\n\n')

if __name__ == "__main__":
    sprites_dir = 'assets/sprites'
    output_sprites = 'sprite_map.js'

    sprite_map = traverse_directory(sprites_dir)
    generate_js_file(sprite_map, output_sprites)
