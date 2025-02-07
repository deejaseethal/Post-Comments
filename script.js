document.addEventListener("DOMContentLoaded", function () {
  const welcomeMessage = document.getElementById("welcome-message");
  const getPostsButton = document.getElementById("get-posts");
  const loadMoreButton = document.getElementById("load-more");
  const postsContainer = document.getElementById("posts-container");
  const favouritesCounter = document.getElementById("favourites-counter");

  let posts = []; // Store fetched posts
  let currentIndex = 0; // Track how many posts are displayed
  const postsPerPage = 10; // Number of posts to load at a time
  let favouriteCount = 0; // Track the number of favourited posts

  // Fetch user data on page load
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => {
      welcomeMessage.textContent = `Welcome, ${users[0].name}`;
    })
    .catch((error) => {
      console.error("Error fetching user:", error);
      welcomeMessage.textContent = "Failed to load user.";
    });

  // Fetch all posts when "Get Posts" is clicked
  getPostsButton.addEventListener("click", function () {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        posts = data; // Store all posts
        currentIndex = 0; // Reset index
        postsContainer.innerHTML = ""; // Clear previous posts
        displayPosts(); // Show first 10 posts
        loadMoreButton.style.display = "block"; // Show Load More button
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  });

  // Function to display posts
  function displayPosts() {
    const nextPosts = posts.slice(currentIndex, currentIndex + postsPerPage);
    nextPosts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("card", "mt-2");
      postElement.style.position = "relative"; // Relative positioning for button inside the card

      // Create the anchor tag around the card content to make it clickable
      const postLink = document.createElement("a");
      postLink.href = `post-details.html?postId=${post.id}`; // Link to the new page with post ID
      console.log("postid", `post-details.html?postId=${post.id}`);

      postElement.innerHTML = `
          <div class="card-body shadow ">
            <p class="card-title">${post.title}</p>   
            <a href="post-details.html?postId=${post.id}" class="show-link" style="color:#54B4D3;" >Show</a>
            <i class="fa-regular fa-star fav-btn" style="cursor: pointer; color:#54B4D3;"></i>      
          </div>
        
        `;
      postsContainer.appendChild(postElement);

      // Add event listener to the favorite button
      const favButton = postElement.querySelector(".fav-btn");
      favButton.addEventListener("click", function () {
        // Increment the favourite count
        if (favButton.classList.contains("fa-regular")) {
          favButton.classList.remove("fa-regular");
          favButton.classList.add("fa-solid"); // Change to solid star icon when favorited
          favouriteCount++;
        } else {
          favButton.classList.remove("fa-solid");
          favButton.classList.add("fa-regular");
          favouriteCount--;
        }
        // Update the favourites counter
        if (favouriteCount > 0) {
          favouritesCounter.classList.remove("d-none");
          favouritesCounter.textContent = `${favouriteCount}`;
        } else {
          favouritesCounter.classList.add("d-none");
        }
        // Change button text to indicate it's favorited
      });
    });
    currentIndex += postsPerPage;

    // Hide Load More button when all posts are loaded
    if (currentIndex >= posts.length) {
      loadMoreButton.style.display = "none";
    }
  }

  // Load More Button Click - Fetch Next 10 Posts
  loadMoreButton.addEventListener("click", displayPosts);
});
