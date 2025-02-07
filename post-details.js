// 🔹 Get the postId from the URL
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("postId");

console.log("postId", postId);

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`) // Change the post ID as needed
  .then((response) => response.json())
  .then((post) => {
    const postDetails = document.getElementById("post-details");
    postDetails.innerHTML = `
            <div class="card">
              <div class="card-body">             
                <h5 class="card-title text-center bg-light p-2">${post.title}</h5>
                <p class="card-text">${post.body}</p>
                
              </div>
              <button
        id="read-comments-btn"
        class="btn btn-outline-info text-center btn-sm"
      >
        Read Comments
      </button>
            </div>
          `;

    const readCommentsBtn = document.getElementById("read-comments-btn");
    //readCommentsBtn.style.display = "inline-block";

    // Handle "Read Comments" button click
    readCommentsBtn.addEventListener("click", function () {
      fetchComments(post.id); // Fetch comments for the current post using its postId
    });
  })
  .catch((error) => console.log("Error fetching post details:", error));

// Function to fetch comments for the post
function fetchComments(postId) {
  fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    .then((response) => response.json())
    .then((comments) => {
      const commentsContainer = document.getElementById("comments-container");
      commentsContainer.innerHTML = ""; // Clear any existing comments

      // Loop through and display comments
      comments.forEach((comment) => {
        commentsContainer.innerHTML += `
                <div class="card h-100" >
                  <div class="card-body">
                    <p class="card-title" style="font-size:12px ">${comment.name}</p>
                    <p class="card-text text-muted" style="font-size:12px">${comment.body}</p>
                  </div>
                </div>
              `;
      });
    })
    .catch((error) => console.log("Error fetching comments:", error));
}
