$(document).ready(function() {

  //sticky header
  $(window).scroll(function() {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }

    // Update the active section in the header
    updateActiveSection();
  });

  $(".header ul li a").click(function(e) {
    e.preventDefault(); 

    var target = $(this).attr("href");

    if ($(target).hasClass("active-section")) {
      return; 
    }

    if (target === "#home") {
      $("html, body").animate(
        {
          scrollTop: 0 
        },
        500
      );
    } else {
      var offset = $(target).offset().top - 40; 

      $("html, body").animate(
        {
          scrollTop: offset
        },
        500
      );
    }

    $(".header ul li a").removeClass("active");
    $(this).addClass("active");
  });

  //Initial content revealing js
  ScrollReveal({
    distance: "100px",
    duration: 2000,
    delay: 200
  });

  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
    origin: "left"
  });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
    origin: "right"
  });
  ScrollReveal().reveal(".project-title, .contact-title", {
    origin: "top"
  });
  ScrollReveal().reveal(".projects, .contact", {
    origin: "bottom"
  });

  // 🚀 Contact form submission handling (added part)
  $("#contactForm").on("submit", function(e) {
    e.preventDefault(); // stop page redirect

    var form = $(this);
    var formData = form.serialize();

    $.ajax({
      type: form.attr("method") || "POST",
      url: form.attr("action") || "", // your form handler (e.g., Formspree/EmailJS/PHP)
      data: formData,
      success: function() {
        alert("✅ Message sent successfully!");
        form[0].reset();
      },
      error: function() {
        alert("❌ Oops! Something went wrong. Please try again.");
      }
    });
  });

});


// Section active link highlight
function updateActiveSection() {
  var scrollPosition = $(window).scrollTop();

  if (scrollPosition === 0) {
    $(".header ul li a").removeClass("active");
    $(".header ul li a[href='#home']").addClass("active");
    return;
  }

  $("section").each(function() {
    var target = $(this).attr("id");
    var offset = $(this).offset().top;
    var height = $(this).outerHeight();

    if (
      scrollPosition >= offset - 40 &&
      scrollPosition < offset + height - 40
    ) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#" + target + "']").addClass("active");
    }
  });
}
