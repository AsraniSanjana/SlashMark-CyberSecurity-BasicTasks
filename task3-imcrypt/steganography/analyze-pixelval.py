from PIL import Image

# Load the image
image_path = 'encoded_image.png'

image = Image.open(image_path)
pixels = image.load()

# Print pixel values at specific locations (for demonstration)
def print_pixel_values(image, locations):
    pixels = image.load()  # Load pixel data
    for loc in locations:
        x, y = loc
        print(f"Pixel at ({x}, {y}): {pixels[x, y]}")

# Example usage
locations_to_check = [(0, 0), (1, 0), (2, 0), (3, 0)]   #lenght of msg is 4, so #pixels modified/encoded are 4.

print_pixel_values(image, locations_to_check)
