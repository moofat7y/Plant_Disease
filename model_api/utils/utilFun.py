import sys
import numpy as np
from io import BytesIO
from PIL import Image


def read_file_as_image(data) -> np.ndarray:
  image = np.array(Image.open(BytesIO(data)))
  return image

sys.modules[read_file_as_image]= {read_file_as_image}