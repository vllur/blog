---
title: Making documents for print in HTML and CSS
---

Printing a web page might sound like a bad idea. But CSS and browsers are capable of rendering a good looking PDF document ready for any printer. That means you can use every web development technique you want. Without animations, of course.

## Sizing

You can specify document size like this:

```css
html, body{
  width: 210mm;
  height: 297mm;
  margin: 0;
}

@page{
  size: A4;
  margin: 0;
}

@media print{
  html, body{
    width: 210mm;
    height: 297mm;
  }
}
```

I like to get rid of default margins. You should also prefer using `cm` and `mm` units over `px`. This will allow you to fine tune the design.

## Colors

By default, browsers try to optimize colors to cut the ink cost of printing. If you want to have pretty colored PDF anyway, then you want to adjust this:

```css
*{
  print-color-adjust: exact;
}
```

## Printing

I use Firefox and results are good. All you need to do is to select `Print...` in your browser. `Print using the system dialog...` option allows to enable background colors and images. You can also remove automatic header and footer there.
