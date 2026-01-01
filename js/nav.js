document.getElementById('maedulyMenuBtn').addEventListener('click', function() {
    document.getElementById('maedulyNavLinks').classList.toggle('active');
});

document.querySelectorAll('.maeduly-nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        document.getElementById('maedulyNavLinks').classList.remove('active');
    });
});

document.addEventListener('click', function(event) {
    const navLinks = document.getElementById('maedulyNavLinks');
    const menuBtn = document.getElementById('maedulyMenuBtn');
    
    if (!navLinks.contains(event.target) && !menuBtn.contains(event.target)) {
        navLinks.classList.remove('active');
    }
});