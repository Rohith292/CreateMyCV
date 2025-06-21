import moment from "moment";
import html2canvas from "html2canvas";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};


// Get the lightest average color from an image
export const getLightestColorFromImage = (imageUrl) => {
  return new Promise((resolve, reject) => {
    // Validate the image URL
    if (!imageUrl || typeof imageUrl !== 'string') {
      return reject(new Error('Invalid image URL'));
    }

    const img = new Image();

    // Set crossOrigin for CORS issues if not a base64 string
    if (!imageUrl.startsWith('data:')) {
      img.crossOrigin = 'anonymous';
    }

    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let r = 0, g = 0, b = 0, count = 0;

      // Loop through pixels to compute the lightest average color
      for (let i = 0; i < data.length; i += 4) {
        const brightness = data[i] + data[i + 1] + data[i + 2]; // Sum of RGB values
        if (brightness > 600) { // Threshold to focus on bright colors
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          count++;
        }
      }

      if (count === 0) {
        resolve("#ffffff"); // Default to white if no bright pixels are detected
      } else {
        r = Math.round(r / count);
        g = Math.round(g / count);
        b = Math.round(b / count);
        resolve(`rgb(${r}, ${g}, ${b})`);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
  });
};

//Format the date in MM-YYYY
export function formatYearMonth(yearMonth){
  return yearMonth ? moment(yearMonth , "YYYY MM").format("MMM YYYY"):"";
}

export const fixTailwindColors = (element) => {
  const elements = element.querySelectorAll("*");

  elements.forEach((el) => {
    const style = window.getComputedStyle(el);

    ["color", "backgroundColor", "borderColor"].forEach((prop) => {
      const value = style[prop];
      if (value.includes("oklch")) {
        el.style[prop] = "#000"; // or any safe fallback
      }
    });
  });
};


export async function captureElementAsImage(element) {
  if (!element) throw new Error("No element provided");

  const canvas = await html2canvas(element);
  return canvas.toDataURL("image/png");
}


export const dataURLtoFile = (dataUrl, fileName) => {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], fileName, { type: mime });
};

