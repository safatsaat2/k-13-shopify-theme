class CurriculumManager {
  constructor() {
    this.activeTabIndex = 0;
    this.tabElements = [];
    this.contentSections = [];
    this.modules = [];
    this.moduleLimit = 8;
    this.expandedTabs = new Set();

    this.init();
  }

  init() {
    this.setupTabs();
    this.setupAccordions();
    this.setupViewAllButtons();
    this.setInitialState();
    this.setupCourseTabs(); // Add course tabs setup
  }

  setupTabs() {
    const tabContainer = document.querySelector(".nxt-curriculum__tabs");
    const contentWrappers = document.querySelectorAll(
      ".nxt-curriculum__section__wrapper"
    );

    if (!tabContainer || !contentWrappers.length) return;

    this.tabElements = Array.from(
      tabContainer.querySelectorAll(".nxt-curriculum__tab")
    );
    this.contentSections = Array.from(contentWrappers);

    // Add click event listeners to tabs
    this.tabElements.forEach((tab, index) => {
      tab.addEventListener("click", (e) => {
        e.preventDefault();
        this.switchTab(index);
      });

      // Add keyboard support
      tab.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.switchTab(index);
        }
      });
    });
  }

  setupAccordions() {
    this.modules = Array.from(
      document.querySelectorAll(".nxt-curriculum__module")
    );

    this.modules.forEach((module, index) => {
      const header = module.querySelector(".nxt-curriculum__module-header");
      const video = module.querySelector(".nxt-curriculum__module-video");
      const hasVideo = !!video;

      // Set up module state based on video presence
      this.setupModuleState(module, hasVideo);

      if (hasVideo && header) {
        // Add click event for modules with videos
        header.addEventListener("click", (e) => {
          e.preventDefault();
          this.toggleAccordion(module, index);
        });

        // Add keyboard support
        header.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            this.toggleAccordion(module, index);
          }
        });

        // Add ARIA attributes
        header.setAttribute("tabindex", "0");
        header.setAttribute("role", "button");
        header.setAttribute(
          "aria-expanded",
          module.classList.contains("module_open") ? "true" : "false"
        );
        header.setAttribute("aria-controls", `module-content-${index}`);

        if (video) {
          video.setAttribute("id", `module-content-${index}`);
          video.setAttribute("aria-labelledby", `module-header-${index}`);
        }

        header.setAttribute("id", `module-header-${index}`);
      } else if (header) {
        // For locked modules, ensure they're not interactive
        header.setAttribute("aria-expanded", "false");
        header.removeAttribute("tabindex");
        header.removeAttribute("role");
      }
    });
  }

  setupModuleState(module, hasVideo) {
    if (!hasVideo) {
      // Lock modules without videos
      module.classList.add("module_locked");
      module.classList.remove("module_open");

      const header = module.querySelector(".nxt-curriculum__module-header");
      if (header) {
        header.style.cursor = "not-allowed";
        header.setAttribute("aria-disabled", "true");
      }
    } else {
      // Enable modules with videos
      module.classList.remove("module_locked");

      const header = module.querySelector(".nxt-curriculum__module-header");
      if (header) {
        header.style.cursor = "pointer";
        header.removeAttribute("aria-disabled");
      }
    }
  }

  switchTab(targetIndex) {
    if (targetIndex === this.activeTabIndex) return;

    // Update tab states
    this.tabElements.forEach((tab, index) => {
      const tabText = tab.querySelector(".nxt-curriculum__tab-text");
      const isActive = index === targetIndex;

      // Update classes
      tab.classList.toggle("nxt-curriculum__tab--active", isActive);
      tab.classList.toggle("nxt-curriculum__tab--inactive", !isActive);

      if (tabText) {
        tabText.classList.toggle("nxt-curriculum__tab-text--active", isActive);
        tabText.classList.toggle(
          "nxt-curriculum__tab-text--inactive",
          !isActive
        );
      }

      // Update ARIA attributes
      tab.setAttribute("aria-selected", isActive);
      tab.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    // Update content visibility using classes
    this.contentSections.forEach((section, index) => {
      const isVisible = index === targetIndex;
      section.classList.toggle(
        "nxt-curriculum__section__wrapper--active",
        isVisible
      );
      section.setAttribute("aria-hidden", !isVisible);
    });

    this.activeTabIndex = targetIndex;

    // Update module visibility and view all button
    this.updateModuleVisibility(targetIndex);
    this.updateViewAllButton(targetIndex);

    // Announce tab change to screen readers
    this.announceTabChange(targetIndex);
  }

  toggleAccordion(module, moduleIndex) {
    if (module.classList.contains("module_locked")) return;

    const isOpen = module.classList.contains("module_open");
    const header = module.querySelector(".nxt-curriculum__module-header");

    // Close other open modules in the same section first
    this.closeOtherModules(module, moduleIndex);

    // Then toggle the current module
    module.classList.toggle("module_open", !isOpen);

    // Update ARIA attributes
    if (header) {
      header.setAttribute("aria-expanded", !isOpen);
    }
  }

  closeOtherModules(currentModule, currentIndex) {
    // Find the parent section to only affect modules in the same tab
    const parentSection = currentModule.closest(
      ".nxt-curriculum__section__wrapper"
    );
    if (!parentSection) return;

    const modulesInSection = parentSection.querySelectorAll(
      ".nxt-curriculum__module"
    );

    modulesInSection.forEach((module) => {
      if (
        module !== currentModule &&
        module.classList.contains("module_open")
      ) {
        // Close the module directly without recursion
        module.classList.remove("module_open");

        const header = module.querySelector(".nxt-curriculum__module-header");
        if (header) {
          header.setAttribute("aria-expanded", "false");
        }
      }
    });
  }

  setInitialState() {
    // Ensure first tab is active initially
    this.activeTabIndex = 0;

    // Update initial tab states
    this.tabElements.forEach((tab, index) => {
      const tabText = tab.querySelector(".nxt-curriculum__tab-text");
      const isActive = index === 0;

      tab.classList.toggle("nxt-curriculum__tab--active", isActive);
      tab.classList.toggle("nxt-curriculum__tab--inactive", !isActive);

      if (tabText) {
        tabText.classList.toggle("nxt-curriculum__tab-text--active", isActive);
        tabText.classList.toggle(
          "nxt-curriculum__tab-text--inactive",
          !isActive
        );
      }

      tab.setAttribute("aria-selected", isActive);
      tab.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    // Update initial content visibility
    this.contentSections.forEach((section, index) => {
      const isVisible = index === 0;
      section.classList.toggle(
        "nxt-curriculum__section__wrapper--active",
        isVisible
      );
      section.setAttribute("aria-hidden", !isVisible);
    });

    // Initialize module visibility and buttons for first tab
    this.updateModuleVisibility(0);
    this.updateViewAllButton(0);
  }

  setupViewAllButtons() {
    // Use event delegation since we need to handle buttons in different tabs
    document.addEventListener("click", (e) => {
      if (e.target.closest(".nxt-curriculum__view-all")) {
        e.preventDefault();
        const button = e.target.closest(".nxt-curriculum__view-all");
        const section = button.closest(".nxt-curriculum__section__wrapper");
        const tabIndex = this.contentSections.indexOf(section);

        if (tabIndex !== -1) {
          this.toggleViewAll(tabIndex);
        }
      }
    });
  }

  updateModuleVisibility(tabIndex) {
    const currentSection = this.contentSections[tabIndex];
    if (!currentSection) return;

    const modules = currentSection.querySelectorAll(".nxt-curriculum__module");
    const isExpanded = this.expandedTabs.has(tabIndex);

    modules.forEach((module, index) => {
      if (isExpanded || index < this.moduleLimit) {
        module.classList.remove("nxt-module--hidden");
      } else {
        module.classList.add("nxt-module--hidden");
      }
    });
  }

  updateViewAllButton(tabIndex) {
    const currentSection = this.contentSections[tabIndex];
    if (!currentSection) return;

    const modules = currentSection.querySelectorAll(".nxt-curriculum__module");
    const viewAllButton = currentSection.querySelector(
      ".nxt-curriculum__view-all"
    );
    const viewAllText = viewAllButton?.querySelector(
      ".nxt-curriculum__view-all-text"
    );

    if (!viewAllButton || !viewAllText) return;

    const totalModules = modules.length;
    const isExpanded = this.expandedTabs.has(tabIndex);

    if (totalModules <= this.moduleLimit) {
      viewAllButton.style.display = "none";
    } else {
      viewAllButton.style.display = "flex";

      if (isExpanded) {
        viewAllText.textContent = `show less`;
        viewAllButton.classList.add("nxt-curriculum__view-all--expanded");
      } else {
        // const hiddenCount = totalModules - this.moduleLimit;
        viewAllText.textContent = `view all ${totalModules} modules`;
        viewAllButton.classList.remove("nxt-curriculum__view-all--expanded");
      }
    }
  }

  toggleViewAll(tabIndex) {
    if (this.expandedTabs.has(tabIndex)) {
      this.expandedTabs.delete(tabIndex);
    } else {
      this.expandedTabs.add(tabIndex);
    }

    this.updateModuleVisibility(tabIndex);
    this.updateViewAllButton(tabIndex);

    // Scroll to view all button if collapsing
    if (!this.expandedTabs.has(tabIndex)) {
      const currentSection = this.contentSections[tabIndex];
      const viewAllButton = currentSection?.querySelector(
        ".nxt-curriculum__view-all"
      );
      if (viewAllButton) {
        viewAllButton.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }

  announceTabChange(tabIndex) {
    const tabText = this.tabElements[tabIndex]?.querySelector(
      ".nxt-curriculum__tab-text"
    )?.textContent;
    if (tabText) {
      // Create or update live region for screen readers
      let liveRegion = document.getElementById("curriculum-live-region");
      if (!liveRegion) {
        liveRegion = document.createElement("div");
        liveRegion.id = "curriculum-live-region";
        liveRegion.setAttribute("aria-live", "polite");
        liveRegion.setAttribute("aria-atomic", "true");
        liveRegion.style.position = "absolute";
        liveRegion.style.left = "-9999px";
        liveRegion.style.width = "1px";
        liveRegion.style.height = "1px";
        liveRegion.style.overflow = "hidden";
        document.body.appendChild(liveRegion);
      }

      liveRegion.textContent = `${tabText} tab selected`;
    }
  }

  // Public method to programmatically switch tabs
  goToTab(index) {
    if (index >= 0 && index < this.tabElements.length) {
      this.switchTab(index);
    }
  }

  // Public method to expand/collapse specific module
  toggleModule(moduleIndex) {
    if (moduleIndex >= 0 && moduleIndex < this.modules.length) {
      const module = this.modules[moduleIndex];
      this.toggleAccordion(module, moduleIndex);
    }
  }

  // Public method to get current state
  getState() {
    return {
      activeTab: this.activeTabIndex,
      openModules: this.modules.map((module, index) => ({
        index,
        isOpen: module.classList.contains("module_open"),
        isLocked: module.classList.contains("module_locked"),
        hasVideo: !!module.querySelector(".nxt-curriculum__module-video"),
      })),
    };
  }

  // Setup dynamic course tabs based on nxt-contentBox__header elements
  setupCourseTabs() {
    const courseTabsContainer = document.querySelector(".course-tabs");
    const contentBoxes = document.querySelectorAll(".nxt-contentBox");

    if (!courseTabsContainer || !contentBoxes.length) return;

    // Clear existing static tabs
    courseTabsContainer.innerHTML = "";

    // Generate dynamic tabs from content boxes
    contentBoxes.forEach((contentBox, index) => {
      const header = contentBox.querySelector(".nxt-contentBox__header");
      const boxId = contentBox.id;

      if (header && boxId) {
        const headerText = header.textContent.trim();
        const tabItem = this.createTabItem(headerText, boxId, index === 0);
        courseTabsContainer.appendChild(tabItem);
      }
    });

    // Setup smooth scrolling and active state management
    this.setupCourseTabsInteraction();
  }

  // Create individual tab item
  createTabItem(text, targetId, isActive = false) {
    const tabItem = document.createElement("a");
    tabItem.href = `#${targetId}`;
    tabItem.className = `tab-item ${isActive ? "active" : ""}`;
    tabItem.textContent = text;
    tabItem.setAttribute("data-target", targetId);

    return tabItem;
  }

  // Setup course tabs interaction
  setupCourseTabsInteraction() {
    const courseTabsContainer = document.querySelector(".course-tabs");
    if (!courseTabsContainer) return;

    // Handle tab clicks
    courseTabsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("tab-item")) {
        e.preventDefault();

        const targetId = e.target.getAttribute("data-target");
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          // Update active tab
          this.updateActiveTab(e.target);

          // Smooth scroll to target
          this.scrollToTarget(targetElement);
        }
      }
    });

    // Handle scroll to update active tab based on visible section
    this.setupScrollDetection();
  }

  // Update active tab state
  updateActiveTab(activeTabElement) {
    const allTabs = document.querySelectorAll(".tab-item");

    allTabs.forEach((tab) => {
      tab.classList.remove("active");
    });

    activeTabElement.classList.add("active");
  }

  // Smooth scroll to target element
  scrollToTarget(targetElement) {
    const headerHeight = 100; // Adjust based on your fixed header height
    const targetPosition = targetElement.offsetTop - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }

  // Setup scroll detection to highlight active tab
  setupScrollDetection() {
    let throttleTimer = null;

    window.addEventListener("scroll", () => {
      if (throttleTimer) return;

      throttleTimer = setTimeout(() => {
        this.detectActiveSection();
        throttleTimer = null;
      }, 100);
    });
  }

  // Detect which section is currently in view
  detectActiveSection() {
    const contentBoxes = document.querySelectorAll(".nxt-contentBox");
    const headerHeight = 150; // Adjust based on your layout
    const scrollPosition = window.scrollY + headerHeight;

    let activeSection = null;

    contentBoxes.forEach((box) => {
      const boxTop = box.offsetTop;
      const boxBottom = boxTop + box.offsetHeight;

      if (scrollPosition >= boxTop && scrollPosition < boxBottom) {
        activeSection = box;
      }
    });

    // If we found an active section, update the corresponding tab
    if (activeSection) {
      const targetId = activeSection.id;
      const correspondingTab = document.querySelector(
        `[data-target="${targetId}"]`
      );

      if (correspondingTab) {
        this.updateActiveTab(correspondingTab);
      }
    }
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.curriculumManager = new CurriculumManager();
});

// Handle video play button clicks
document.addEventListener("click", (e) => {
  if (e.target.closest(".nxt-curriculum__module-video-play")) {
    e.preventDefault();
    const playButton = e.target.closest(".nxt-curriculum__module-video-play");
    const videoContainer = playButton.closest(".nxt-curriculum__module-video");
    const videoElement = videoContainer?.querySelector("video");

    if (videoElement && videoContainer) {
      // Pause all other videos first (unique playback)
      pauseAllOtherVideos(videoElement);

      // Only play the video (no toggle behavior needed since button will be removed)
      playVideo(videoElement, videoContainer, playButton);
    }
  }
});

// Function to pause all other videos
function pauseAllOtherVideos(currentVideo) {
  const allVideos = document.querySelectorAll(
    ".nxt-curriculum__module-video video"
  );
  allVideos.forEach((video) => {
    if (video !== currentVideo && !video.paused) {
      const videoContainer = video.closest(".nxt-curriculum__module-video");
      const playButton = videoContainer?.querySelector(
        ".nxt-curriculum__module-video-play"
      );
      pauseVideo(video, videoContainer, playButton);
    }
  });
}

// Function to play video
function playVideo(videoElement, videoContainer, playButton) {
  // Show controls immediately
  videoElement.controls = true;

  // Hide download button and other unwanted controls
  videoElement.controlsList = "nodownload noremoteplayback";

  // Remove play button permanently after first play
  if (playButton) {
    playButton.remove();
  }

  // Add playing class for styling
  videoContainer.classList.add("video-playing");

  // Start playing
  videoElement.play().catch((error) => {
    console.error("Error playing video:", error);
  });
}

// Function to pause video (only used for pausing other videos)
function pauseVideo(videoElement, videoContainer, playButton) {
  videoElement.pause();

  // Only show play button if it still exists (hasn't been played before)
  if (playButton && playButton.parentNode) {
    playButton.style.display = "flex";
  }

  // Remove playing class
  videoContainer?.classList.remove("video-playing");
}

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = CurriculumManager;
}
