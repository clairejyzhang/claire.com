import fs from 'fs';
import path from 'path';
import { load } from 'cheerio';

const postsDirectory = path.join(process.cwd(), 'posts-learning');

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.html')) // Only process .html files
    .map((fileName) => {
      const id = fileName.replace(/\.html$/, ''); // Remove ".html" extension
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Parse the HTML file to extract metadata and content
      const $ = load(fileContents);
      let metadata = {};
      try {
        const rawMetadata = $('#metadata').html();
        console.log("Raw Metadata Content from getSortedPostsData:", rawMetadata);

        if (!rawMetadata) throw new Error("Metadata is empty");
        metadata = JSON.parse(rawMetadata);
        console.log("Parsed Metadata:", metadata);
      } catch (error) {

        console.error("Failed to parse metadata JSON:", error.message);
        throw new Error("Invalid metadata JSON in the HTML file");
      }
      const contentHtml = $('#content').html();

      return {
        id,
        contentHtml,
        ...metadata,
      };
    });

  // Sort posts by num
  return allPostsData.sort((a, b) => (a.num < b.num ? 1 : -1));
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames
    .filter((fileName) => fileName.endsWith('.html')) // Only .html files
    .map((fileName) => ({
      params: {
        id: fileName.replace(/\.html$/, ''),
      },
    }));
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.html`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const $ = load(fileContents);
  let metadata = {};
  try {
    const rawMetadata = $('#metadata').html();
    console.log("Raw Metadata Content from getPostData:", rawMetadata);

    if (!rawMetadata) throw new Error("Metadata is empty");
    metadata = JSON.parse(rawMetadata);
    console.log("Parsed Metadata:", metadata);
  } catch (error) {
    console.error("Failed to parse metadata JSON:", error.message);
    throw new Error("Invalid metadata JSON in the HTML file");
  }
  const contentHtml = $('#content').html();

  return {
    id,
    contentHtml,
    ...metadata,
  };
}



// import fs from 'fs';
// import path from 'path';
// import matter from 'gray-matter';
// import { remark } from 'remark';
// import html from 'remark-html';

// const postsDirectory = path.join(process.cwd(), 'posts-learning');

// // export function getSortedPostsData() {
// //   // Get file names under /posts
// //   const fileNames = fs.readdirSync(postsDirectory);
// //   const allPostsData = fileNames.map((fileName) => {

// //     // Remove ".md" from file name to get id
// //     const id = fileName.replace(/\.md$/, '');
    

// //     // Read markdown file as string
// //     const fullPath = path.join(postsDirectory, fileName);
// //     const fileContents = fs.readFileSync(fullPath, 'utf8');

// //     // Use gray-matter to parse the post metadata section
// //     const matterResult = matter(fileContents);

// //     // Combine the data with the id
// //     return {
// //       id,
// //       ...matterResult.data,
// //     };
// //   });
// //   // Sort posts by num
// //   return allPostsData.sort((a, b) => {
// //     if (a.num < b.num) {
// //       return 1;
// //     } else {
// //       return -1;
// //     }
// //   });
// // }

// export function getSortedPostsData() {
//   // Get file names under /posts
//   const fileNames = fs.readdirSync(postsDirectory);
//   const allPostsData = fileNames
//     .filter((fileName) => {
//       // Only process .md files
//       return fileName.endsWith('.md');
//     })
//     .map((fileName) => {
//       // Remove ".md" from file name to get id
//       const id = fileName.replace(/\.md$/, '');

//       // Read markdown file as string
//       const fullPath = path.join(postsDirectory, fileName);
//       const fileContents = fs.readFileSync(fullPath, 'utf8');

//       // Use gray-matter to parse the post metadata section
//       const matterResult = matter(fileContents);

//       // Combine the data with the id
//       return {
//         id,
//         ...matterResult.data,
//       };
//     });

//   // Sort posts by num
//   return allPostsData.sort((a, b) => {
//     if (a.num < b.num) {
//       return 1;
//     } else {
//       return -1;
//     }
//   });
// }

// export function getAllPostIds() {
//   const fileNames = fs.readdirSync(postsDirectory);

//   return fileNames
//     .filter((fileName) => fileName.endsWith('.md'))
//     .map((fileName) => {
//       return {
//         params: {
//           id: fileName.replace(/\.md$/, ''),
//         },
//       };
//     });
// }


// // export function getAllPostIds() {
// //     const fileNames = fs.readdirSync(postsDirectory);
  
// //     // Returns an array that looks like this:
// //     // [
// //     //   {
// //     //     params: {
// //     //       id: 'ssg-ssr'
// //     //     }
// //     //   },
// //     //   {
// //     //     params: {
// //     //       id: 'pre-rendering'
// //     //     }
// //     //   }
// //     // ]
// //     return fileNames.map((fileName) => {
// //       return {
// //         params: {
// //           id: fileName.replace(/\.md$/, ''),
// //         },
// //       };
// //     });
// // }

// export async function getPostData(id) {
//     const fullPath = path.join(postsDirectory, `${id}.md`);
//     const fileContents = fs.readFileSync(fullPath, 'utf8');
  
//     // Use gray-matter to parse the post metadata section
//     const matterResult = matter(fileContents);
  
//     // Use remark to convert markdown into HTML string
//     const processedContent = await remark()
//         .use(html)
//         .process(matterResult.content);
//     const contentHtml = processedContent.toString();

//     // Combine the data with the id and contentHtml
//     return {
//         id,
//         contentHtml,
//         ...matterResult.data,
//     };
// }

