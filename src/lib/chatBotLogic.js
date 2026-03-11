export const processUserMessage = (text) => {
  const lowerText = text.toLowerCase();

  // Greeting
  if (lowerText.match(/^(hi|hello|hey|greetings|start|yo|hola)/)) {
    return {
      text: "Hello! I'm the Unifiedhive AI assistant. I can help you navigate our services. Are you looking to build something new, secure your infrastructure, or improve your brand?",
      relatedLink: null
    };
  }

  // Web Dev
  if (lowerText.match(/(website|web|landing|frontend|react|ui\/ux|design|site|portal|web dev)/)) {
    return {
      text: "It sounds like you need Website Development services. We build high-performance, responsive websites using modern tech like React and Next.js.",
      relatedLink: "/solutions/web-development",
      linkText: "Explore Web Development"
    };
  }
  
  // App Dev
  if (lowerText.match(/(app|mobile|ios|android|application|software|platform|phone|coding)/)) {
     return {
      text: "For custom applications, our Application Development service is the perfect fit. We build scalable, secure cross-platform apps.",
      relatedLink: "/solutions/app-development",
      linkText: "View App Development"
    };
  }

  // Graphic Design
  if (lowerText.match(/(logo|brand|graphic|visual|identity|marketing|creative|banner|art)/)) {
    return {
      text: "Need to stand out? Our Graphic Designing team creates compelling brand identities, logos, and marketing assets that tell your story.",
      relatedLink: "/solutions/graphic-designing",
      linkText: "See Design Services"
    };
  }

  // DevOps
  if (lowerText.match(/(devops|pipeline|ci\/cd|deploy|automation|speed|release|infrastructure)/)) {
    return {
      text: "Accelerate your releases with our Cloud & DevOps solutions. We automate pipelines and infrastructure management to eliminate toil.",
      relatedLink: "/solutions/cloud-devops",
      linkText: "Check DevOps Services"
    };
  }
  
  // FinOps
  if (lowerText.match(/(cost|budget|aws bill|azure bill|expensive|save|spend|finance|money)/)) {
    return {
      text: "Cloud costs adding up? Our FinOps strategies typically save clients 30-50% on their cloud infrastructure spend through optimization.",
      relatedLink: "/solutions/finops",
      linkText: "Learn About FinOps"
    };
  }

  // Zero Trust / Security
  if (lowerText.match(/(security|secure|hack|breach|compliance|hipaa|soc2|protect|zero trust|safe|audit)/)) {
    return {
      text: "Security is paramount. Our Zero Trust Security framework ensures your data and infrastructure are protected against modern threats.",
      relatedLink: "/solutions/zero-trust-security",
      linkText: "View Security Solutions"
    };
  }

  // Modernization / Migration
  if (lowerText.match(/(legacy|old|migrate|modernize|cloud|on-prem|server|transform|update)/)) {
    return {
      text: "Modernizing legacy systems is crucial for agility. We can help migrate your workloads to the cloud and refactor for performance.",
      relatedLink: "/solutions/migration",
      linkText: "View Modernization"
    };
  }

  // Default / Fallback
  return {
    text: "I can help you with Web/App Development, Graphic Design, DevOps, Security, and more. Could you describe your specific challenge?",
    relatedLink: "/contact",
    linkText: "Contact an Expert"
  };
};