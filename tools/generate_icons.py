import os
from PIL import Image

def generate_icons():
    source_path = 'public/logo_somos_ariana_horizontal-transparente.png'
    if not os.path.exists(source_path):
        print(f"Error: {source_path} not found.")
        return
    
    print("Opening source image...")
    img = Image.open(source_path)
    
    # Define the brand symbol coordinates
    # We found that the symbol starts at x=127 and there is a natural gap at x=771.
    # Height is from y=4 to y=603.
    x0, y0, x1, y1 = 127, 4, 771, 603
    width = x1 - x0
    height = y1 - y0
    
    print(f"Cropping brand symbol region: x0={x0}, y0={y0}, x1={x1}, y1={y1} (size: {width}x{height})")
    cropped = img.crop((x0, y0, x1, y1))
    
    # To make it a perfect square without distortion, we pad it vertically.
    max_dim = max(width, height)
    square_img = Image.new('RGBA', (max_dim, max_dim), (0, 0, 0, 0))
    
    # Calculate offset to center the cropped image
    x_offset = (max_dim - width) // 2
    y_offset = (max_dim - height) // 2
    
    square_img.paste(cropped, (x_offset, y_offset))
    print(f"Created square image with size: {max_dim}x{max_dim}")
    
    # Define output directories
    public_dir = 'public'
    app_dir = 'src/app'
    
    os.makedirs(public_dir, exist_ok=True)
    os.makedirs(app_dir, exist_ok=True)
    
    # Generate and save different sizes
    sizes = {
        'favicon-512x512.png': 512,
        'icon.png': 512,
        'apple-icon.png': 180,
    }
    
    for filename, size in sizes.items():
        resized = square_img.resize((size, size), Image.Resampling.LANCZOS)
        
        # Save in public/
        pub_path = os.path.join(public_dir, filename)
        resized.save(pub_path, 'PNG')
        print(f"Saved: {pub_path}")
        
        # Save in src/app/
        app_path = os.path.join(app_dir, filename)
        # Note: 'favicon-512x512.png' doesn't need to be in app/, only 'icon.png' and 'apple-icon.png'
        if filename != 'favicon-512x512.png':
            resized.save(app_path, 'PNG')
            print(f"Saved: {app_path}")
            
    # Also save standard apple-touch-icon.png in public/
    apple_touch_path = os.path.join(public_dir, 'apple-touch-icon.png')
    square_img.resize((180, 180), Image.Resampling.LANCZOS).save(apple_touch_path, 'PNG')
    print(f"Saved: {apple_touch_path}")
    
    # Save standard favicon.ico in both public/ and src/app/
    # ICO can package multiple resolutions (16x16, 32x32, 48x48)
    ico_resolutions = [16, 32, 48]
    ico_imgs = []
    for res in ico_resolutions:
        ico_imgs.append(square_img.resize((res, res), Image.Resampling.LANCZOS))
        
    ico_pub_path = os.path.join(public_dir, 'favicon.ico')
    ico_app_path = os.path.join(app_dir, 'favicon.ico')
    
    # Save first image and append the other resolutions
    ico_imgs[0].save(ico_pub_path, format='ICO', append_images=ico_imgs[1:])
    ico_imgs[0].save(ico_app_path, format='ICO', append_images=ico_imgs[1:])
    print(f"Saved standard favicon.ico in {ico_pub_path} and {ico_app_path}")
    
    print("All icons generated successfully!")

if __name__ == '__main__':
    generate_icons()
