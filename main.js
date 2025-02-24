document.addEventListener('DOMContentLoaded', function() {
    // Collapsible toggle for elements with class "collapsible"
    var coll = document.getElementsByClassName("collapsible");
    for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            content.style.display = (content.style.display === "block") ? "none" : "block";
        });
    }
    
    // Audio toggle via button: activate video sound for the corresponding video and mute all others
    document.querySelectorAll(".audio-toggle").forEach(button => {
        button.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent other click events
            // Find the closest video-item container and its video element
            const container = button.closest(".video-item");
            const video = container.querySelector("video");
            // Mute all videos except this one
            document.querySelectorAll(".video-item video").forEach(v => {
                if (v !== video) {
                    v.muted = true;
                }
            });
            // Unmute and play the selected video
            video.muted = false;
            video.volume = 1;
            video.play().catch(error => console.error("Error playing video:", error));
        });
    });
});
