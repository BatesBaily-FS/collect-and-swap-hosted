**Reusable Form Component**

This is a component from a previous project where I created a blog. In this blog, the blog posts were rendered from using a file called Post.js which was essentially a template. I used multiple Markdown files to hold the information of each individual post and then had them fill in the template. I figured I could take a similar approach to my Form Component as I have 3 versions of the form that are needed.

**Below here is Post.js file**

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "../components/post.css";

// import images
import jsLibrariesImage from "./js-library.jpeg";
import portfolioImage from "./personal-portfolio2.png";
import webAccessImage from "./web-accessibility1.png";
import futureDevImage from "./future-of-dev1.jpeg";

// import markdown files
import postOne from "../posts/postOne.md";
import postTwo from "../posts/postTwo.md";
import postThree from "../posts/postThree.md";
import postFour from "../posts/postFour.md";

const posts = {
1: { content: postOne },
2: { content: postTwo },
3: { content: postThree },
4: { content: postFour },
};

const imageMap = {
"../components/js-library.jpeg": jsLibrariesImage,
"../components/personal-portfolio2.png": portfolioImage,
"../components/web-accessibility1.png": webAccessImage,
"../components/future-of-dev1.jpeg": futureDevImage,
};

function Post() {
const { id } = useParams();
const [content, setContent] = useState("");
const post = posts[id];

useEffect(() => {
if (post) {
fetch(post.content)
.then((response) => response.text())
.then((text) => setContent(text));
} else {
setContent("Post not found");
}
}, [post]);

return (

<div className="container">
<h1>{post ? post.title : "Post not found"}</h1>
<div className="react-markdown">
<ReactMarkdown
components={{
img: ({ node, ...props }) => {
const { src } = props;
const imageSrc = imageMap[src] || src;

              return (
                <img
                  {...props}
                  src={imageSrc}
                  alt={props.alt}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    width: "400px",
                    borderRadius: "8px",
                    border: "2px solid black",
                  }}
                />
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>

);
}

export default Post;

**Here is an example of the Markdown files**

# Top 10 JavaScript Libraries for Web Development in 2024

JavaScript has become an essential language for web development, there are numerous libraries available to enhance your projects. Here is a list of the top 10 JavaScript libraries that are trending in 2024.

![JavaScript Libraries](../components/js-library.jpeg)

## 1. React

A popular library for building user interfaces, especially single-page applications.

## 2. Vue.js

A progressive framework for building UIs and single-page applications, known for its simplicity and flexibility.

## 3. Angular

A robust framework for building dynamic web applications, maintained by Google.

## 4. D3.js

A powerful library for creating complex data visualization using HTML, SVG, and CSS.

## 5. jQuery

A fast, small, and feature-rich library that simplifies HTML document traversal and manipulation.

## 6. Three.js

A library that makes creating 3D graphics in rge browser easier, supporting WebGL.

## 7. Axios

A promise-based HTTP client for making requests to APIs, popular for its simplicity.

## 8. Lodash

A utility library that provies helpful functions for common programming task, improving productivity.

## 9. Moment.js

A library for parsing, validating, manipulating, and displaying dates and times.

## 10. Next.js

A framework for building server-side rendered React application, enhancing performance and SEO.

## Conclusion

These libraries are just a few examples of the tools available that can help enhance your web development experience. No matter wether your site is simple or complex, the right library is out there for you.

---

_Published on: October 6th, 2024_
_Author: Baily Bates_

**Further Explanation**

Although, most of this code does apply it is a great reference to how I accomplished it again. By following the format, I can create a Dynamic form that serves as a template for my 3 forms (trade proposal, new book club, and new event). I can then setup 3 separate Markdown files for each form with its corresponding information. By creating a component that is reusable, I will save myself time and effort in development
