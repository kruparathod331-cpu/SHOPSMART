/**
 * Developer Profile & Portfolio Configuration
 * 
 * Centralized registry for personal, portfolio, and social links.
 * Replace the bracketed placeholders below with your actual URLs.
 * All links in the footer, about modal, and developer banner consume this file.
 */

export const DEVELOPER_CONFIG = {
  // Developer Details
  name: "Krupa Rathod",
  role: "Full-Stack Software Engineer & AI Builder",
  bio: "Passionate engineer specializing in modern web applications, intelligent recommendation systems, and delightful user experiences.",
  
  // Replace these placeholders with your real URLs:
  socialLinks: {
    github: "[INSERT YOUR GITHUB PROFILE URL]",
    linkedin: "[INSERT YOUR LINKEDIN PROFILE URL]",
    portfolio: "[INSERT YOUR PORTFOLIO WEBSITE URL]",
    email: "[INSERT YOUR PROFESSIONAL EMAIL]",
    projectRepo: "https://github.com", // Will be updated to project repository URL
  },

  // Helper utility to safely determine if a custom URL has been provided
  isConfigured: (linkKey) => {
    const link = DEVELOPER_CONFIG.socialLinks[linkKey];
    return link && !link.includes("[INSERT YOUR");
  },

  // Get safe URL (returns '#' with warning alert or valid URL)
  getSafeUrl: (linkKey) => {
    const link = DEVELOPER_CONFIG.socialLinks[linkKey];
    if (!link || link.includes("[INSERT YOUR")) {
      return "#";
    }
    return link;
  }
};

export default DEVELOPER_CONFIG;

