export interface GlossaryTerm {
  id: string;
  term: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  shortDefinition: string;
  longDefinition: string;
  examples: {
    title: string;
    description: string;
    industry: string;
  }[];
  relatedTerms: string[];
  faq: {
    question: string;
    answer: string;
  }[];
  resources: {
    type: 'blog' | 'external';
    title: string;
    url: string;
  }[];
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: 'artificial-intelligence',
    term: 'Artificial Intelligence (AI)',
    category: 'Fundamentals',
    difficulty: 'beginner',
    shortDefinition: 'The simulation of human intelligence processes by computer systems, including learning, reasoning, and self-correction.',
    longDefinition: 'Artificial Intelligence refers to computer systems designed to perform tasks that typically require human intelligence. These tasks include visual perception, speech recognition, decision-making, and language translation. AI systems learn from experience, adjust to new inputs, and perform human-like tasks through machine learning algorithms and neural networks.',
    examples: [
      {
        title: 'Virtual Assistants',
        description: 'Siri, Alexa, and Google Assistant use AI to understand voice commands and provide relevant responses, improving user productivity by 40%.',
        industry: 'Consumer Tech'
      },
      {
        title: 'Fraud Detection',
        description: 'Banks use AI to analyze transaction patterns and detect fraudulent activities in real-time, preventing $2.5B in losses annually.',
        industry: 'Finance'
      },
      {
        title: 'Personalized Recommendations',
        description: 'E-commerce platforms use AI to suggest products based on browsing history, increasing conversion rates by 30%.',
        industry: 'Retail'
      }
    ],
    relatedTerms: ['machine-learning', 'deep-learning', 'neural-networks', 'natural-language-processing'],
    faq: [
      {
        question: 'What is the difference between AI and Machine Learning?',
        answer: 'AI is the broader concept of machines being able to carry out tasks intelligently. Machine Learning is a specific subset of AI that focuses on machines learning from data without being explicitly programmed.'
      },
      {
        question: 'Is AI going to replace human jobs?',
        answer: 'AI is more likely to augment human capabilities rather than replace them entirely. While some routine tasks may be automated, AI creates new job categories and enhances productivity in existing roles.'
      }
    ],
    resources: [
      {
        type: 'blog',
        title: 'Getting Started with AI for Business',
        url: '/resources/ai-for-business'
      },
      {
        type: 'external',
        title: 'Stanford AI Course',
        url: 'https://online.stanford.edu/courses/cs221-artificial-intelligence-principles-and-techniques'
      }
    ]
  },
  {
    id: 'machine-learning',
    term: 'Machine Learning',
    category: 'Machine Learning',
    difficulty: 'beginner',
    shortDefinition: 'A subset of AI that enables computers to learn from data without explicit programming.',
    longDefinition: 'Machine Learning is a method of data analysis that automates analytical model building. It uses algorithms that iteratively learn from data, allowing computers to find hidden insights without being explicitly programmed where to look. The system improves its performance on a specific task over time with experience.',
    examples: [
      {
        title: 'Email Spam Filtering',
        description: 'Gmail uses ML to identify spam emails by learning from millions of examples, achieving 99.9% accuracy.',
        industry: 'Technology'
      },
      {
        title: 'Predictive Maintenance',
        description: 'Manufacturers use ML to predict equipment failures before they happen, reducing downtime by 50%.',
        industry: 'Manufacturing'
      },
      {
        title: 'Customer Churn Prediction',
        description: 'Telecom companies use ML to identify customers likely to cancel, enabling proactive retention strategies.',
        industry: 'Telecommunications'
      }
    ],
    relatedTerms: ['artificial-intelligence', 'deep-learning', 'supervised-learning', 'unsupervised-learning'],
    faq: [
      {
        question: 'Do I need a data science team to use Machine Learning?',
        answer: 'Not necessarily. Many ML tools like AutoML platforms allow non-technical users to build models. However, having data science expertise helps optimize results and interpret findings.'
      },
      {
        question: 'How much data do I need for Machine Learning?',
        answer: 'It depends on the problem complexity. Simple tasks might need hundreds of examples, while complex problems like image recognition may require thousands or millions of data points.'
      }
    ],
    resources: [
      {
        type: 'blog',
        title: 'Machine Learning for SMBs: A Practical Guide',
        url: '/resources/ml-for-smbs'
      },
      {
        type: 'external',
        title: 'Google ML Crash Course',
        url: 'https://developers.google.com/machine-learning/crash-course'
      }
    ]
  },
  {
    id: 'deep-learning',
    term: 'Deep Learning',
    category: 'Machine Learning',
    difficulty: 'intermediate',
    shortDefinition: 'A subset of machine learning using multi-layered neural networks to analyze complex patterns.',
    longDefinition: 'Deep Learning is a specialized form of machine learning that uses artificial neural networks with multiple layers (hence "deep") to progressively extract higher-level features from raw input. It excels at processing unstructured data like images, audio, and text, and has powered breakthroughs in computer vision, speech recognition, and natural language processing.',
    examples: [
      {
        title: 'Autonomous Vehicles',
        description: 'Tesla uses deep learning to process camera feeds and make real-time driving decisions, achieving Level 2+ autonomy.',
        industry: 'Automotive'
      },
      {
        title: 'Medical Diagnosis',
        description: 'Deep learning models detect cancer in medical images with 95%+ accuracy, matching or exceeding radiologist performance.',
        industry: 'Healthcare'
      },
      {
        title: 'Voice Recognition',
        description: 'Alexa and Siri use deep learning to understand natural speech with 95% accuracy across accents and languages.',
        industry: 'Consumer Tech'
      }
    ],
    relatedTerms: ['machine-learning', 'neural-networks', 'artificial-intelligence', 'computer-vision'],
    faq: [
      {
        question: 'What is the difference between Machine Learning and Deep Learning?',
        answer: 'Deep Learning is a subset of Machine Learning that uses neural networks with many layers. While traditional ML often requires manual feature engineering, deep learning can automatically learn features from raw data.'
      },
      {
        question: 'Why is Deep Learning so popular now?',
        answer: 'Three factors: availability of large datasets, powerful GPUs for computation, and algorithmic improvements. These enable training complex models that were previously impractical.'
      }
    ],
    resources: [
      {
        type: 'blog',
        title: 'Deep Learning Applications in Business',
        url: '/resources/deep-learning-business'
      },
      {
        type: 'external',
        title: 'Deep Learning Specialization (Coursera)',
        url: 'https://www.coursera.org/specializations/deep-learning'
      }
    ]
  },
  {
    id: 'natural-language-processing',
    term: 'Natural Language Processing (NLP)',
    category: 'Natural Language Processing',
    difficulty: 'intermediate',
    shortDefinition: 'AI technology that enables computers to understand, interpret, and generate human language.',
    longDefinition: 'Natural Language Processing is a branch of AI that focuses on the interaction between computers and human language. It combines computational linguistics with machine learning to enable computers to process, analyze, and derive meaning from human language in text or voice data. NLP powers applications like chatbots, translation services, and sentiment analysis.',
    examples: [
      {
        title: 'Customer Service Chatbots',
        description: 'Companies use NLP-powered chatbots to handle 80% of routine customer inquiries, reducing support costs by 60%.',
        industry: 'Customer Service'
      },
      {
        title: 'Sentiment Analysis',
        description: 'Brands analyze social media posts with NLP to understand customer sentiment, informing product and marketing strategies.',
        industry: 'Marketing'
      },
      {
        title: 'Document Processing',
        description: 'Law firms use NLP to extract key information from contracts, reducing review time from hours to minutes.',
        industry: 'Legal'
      }
    ],
    relatedTerms: ['large-language-model', 'gpt', 'tokenization', 'artificial-intelligence'],
    faq: [
      {
        question: 'What are common NLP tasks?',
        answer: 'Common tasks include text classification, named entity recognition, sentiment analysis, machine translation, question answering, and text summarization.'
      },
      {
        question: 'How accurate is NLP?',
        answer: 'Accuracy varies by task and language. Modern NLP models achieve 90%+ accuracy on many English tasks, but performance may be lower for specialized domains or less-resourced languages.'
      }
    ],
    resources: [
      {
        type: 'blog',
        title: 'NLP Use Cases for Business',
        url: '/resources/nlp-use-cases'
      },
      {
        type: 'external',
        title: 'NLP with Python',
        url: 'https://www.nltk.org/book/'
      }
    ]
  },
  {
    id: 'large-language-model',
    term: 'Large Language Model (LLM)',
    category: 'Generative AI',
    difficulty: 'intermediate',
    shortDefinition: 'AI models trained on vast amounts of text data to understand and generate human-like language.',
    longDefinition: 'Large Language Models are neural networks trained on massive text datasets (billions of words) to understand context, generate coherent text, answer questions, and perform various language tasks. Examples include GPT-4, Claude, and Gemini. LLMs use transformer architecture and can be fine-tuned for specific applications like customer support, content creation, or code generation.',
    examples: [
      {
        title: 'Content Generation',
        description: 'Marketing teams use LLMs to generate blog posts, social media content, and ad copy, increasing output by 10x.',
        industry: 'Marketing'
      },
      {
        title: 'Code Assistance',
        description: 'Developers use LLMs like GitHub Copilot to write code faster, improving productivity by 55%.',
        industry: 'Software Development'
      },
      {
        title: 'Customer Support',
        description: 'Companies deploy LLM-powered chatbots that handle complex inquiries with 85% resolution rate.',
        industry: 'Customer Service'
      }
    ],
    relatedTerms: ['gpt', 'natural-language-processing', 'transformer', 'fine-tuning'],
    faq: [
      {
        question: 'What makes a language model "large"?',
        answer: 'Size refers to the number of parameters (weights) in the model. LLMs typically have billions of parameters, enabling them to capture complex language patterns and knowledge.'
      },
      {
        question: 'Can LLMs replace human writers?',
        answer: 'LLMs are powerful tools for augmenting human creativity, not replacing it. They excel at drafting and ideation but still require human oversight for accuracy, tone, and strategic direction.'
      }
    ],
    resources: [
      {
        type: 'blog',
        title: 'LLM Applications for Business',
        url: '/resources/llm-applications'
      },
      {
        type: 'external',
        title: 'OpenAI GPT Documentation',
        url: 'https://platform.openai.com/docs/'
      }
    ]
  },
  {
    id: 'gpt',
    term: 'GPT (Generative Pre-trained Transformer)',
    category: 'Generative AI',
    difficulty: 'intermediate',
    shortDefinition: 'A family of large language models developed by OpenAI, capable of generating human-like text.',
    longDefinition: 'GPT is a series of large language models that use transformer architecture and are pre-trained on massive text datasets. The models learn to predict the next word in a sequence, enabling them to generate coherent, contextually relevant text. GPT-4, the latest version, can understand and generate text across multiple languages, reason about complex topics, and even process images.',
    examples: [
      {
        title: 'ChatGPT for Customer Support',
        description: 'Companies integrate ChatGPT to provide 24/7 customer support, handling 70% of inquiries without human intervention.',
        industry: 'Customer Service'
      },
      {
        title: 'Content Personalization',
        description: 'E-learning platforms use GPT to generate personalized learning materials for each student, improving engagement by 45%.',
        industry: 'Education'
      },
      {
        title: 'Legal Document Drafting',
        description: 'Law firms use GPT to draft contracts and legal documents, reducing drafting time by 60%.',
        industry: 'Legal'
      }
    ],
    relatedTerms: ['large-language-model', 'transformer', 'prompt-engineering', 'fine-tuning'],
    faq: [
      {
        question: 'What is the difference between GPT-3 and GPT-4?',
        answer: 'GPT-4 is larger, more accurate, and can process both text and images. It shows improved reasoning, reduced hallucinations, and better instruction-following compared to GPT-3.'
      },
      {
        question: 'Can I train my own GPT model?',
        answer: 'Training a full GPT model from scratch requires massive computational resources. However, you can fine-tune existing GPT models on your specific data for customized applications.'
      }
    ],
    resources: [
      {
        type: 'blog',
        title: 'Getting Started with GPT-4',
        url: '/resources/gpt4-guide'
      },
      {
        type: 'external',
        title: 'OpenAI API Documentation',
        url: 'https://platform.openai.com/docs/guides/gpt'
      }
    ]
  },
  {
    id: 'prompt-engineering',
    term: 'Prompt Engineering',
    category: 'Generative AI',
    difficulty: 'beginner',
    shortDefinition: 'The practice of designing effective inputs (prompts) to get desired outputs from AI models.',
    longDefinition: 'Prompt Engineering is the art and science of crafting inputs to guide AI models (especially LLMs) toward producing desired outputs. It involves understanding model capabilities, structuring queries effectively, providing context, and iterating on prompts to improve results. Good prompt engineering can dramatically improve AI output quality, accuracy, and relevance.',
    examples: [
      {
        title: 'Marketing Copy Generation',
        description: 'Marketers use structured prompts to generate brand-consistent ad copy, improving campaign performance by 35%.',
        industry: 'Marketing'
      },
      {
        title: 'Data Extraction',
        description: 'Companies use prompts to extract structured data from unstructured documents, automating 90% of manual data entry.',
        industry: 'Operations'
      },
      {
        title: 'Code Generation',
        description: 'Developers use detailed prompts to generate code snippets, reducing development time by 40%.',
        industry: 'Software Development'
      }
    ],
    relatedTerms: ['gpt', 'large-language-model', 'fine-tuning', 'ai-agent'],
    faq: [
      {
        question: 'What makes a good prompt?',
        answer: 'Good prompts are clear, specific, provide context, include examples when helpful, and specify the desired format or style of the output.'
      },
      {
        question: 'Is prompt engineering a real skill?',
        answer: 'Yes. Effective prompt engineering requires understanding of AI capabilities, domain knowledge, and iterative experimentation. It is becoming a valuable skill in many industries.'
      }
    ],
    resources: [
      {
        type: 'blog',
        title: 'Prompt Engineering Best Practices',
        url: '/resources/prompt-engineering'
      },
      {
        type: 'external',
        title: 'OpenAI Prompt Engineering Guide',
        url: 'https://platform.openai.com/docs/guides/prompt-engineering'
      }
    ]
  },
  {
    id: 'fine-tuning',
    term: 'Fine-tuning',
    category: 'Machine Learning',
    difficulty: 'intermediate',
    shortDefinition: 'Adapting a pre-trained AI model to a specific task or domain using additional training data.',
    longDefinition: 'Fine-tuning is the process of taking a pre-trained model and training it further on a smaller, task-specific dataset. This allows the model to specialize in a particular domain while retaining the general knowledge learned during pre-training. Fine-tuning is more efficient than training from scratch and enables customization for specific business needs.',
    examples: [
      {
        title: 'Medical Diagnosis',
        description: 'Hospitals fine-tune vision models on their medical imaging data, achieving 98% accuracy for specific conditions.',
        industry: 'Healthcare'
      },
      {
        title: 'Customer Support Chatbot',
        description: 'Companies fine-tune LLMs on their support tickets to create chatbots that understand company-specific terminology.',
        industry: 'Customer Service'
      },
      {
        title: 'Financial Analysis',
        description: 'Banks fine-tune models on financial documents to extract insights and detect anomalies with 92% accuracy.',
        industry: 'Finance'
      }
    ],
    relatedTerms: ['machine-learning', 'transfer-learning', 'gpt', 'large-language-model'],
    faq: [
      {
        question: 'When should I fine-tune vs. use prompt engineering?',
        answer: 'Use prompt engineering for quick iterations and general tasks. Fine-tune when you need consistent performance on a specific domain, have sufficient training data, and can invest in the process.'
      },
      {
        question: 'How much data do I need for fine-tuning?',
        answer: 'It varies by task. For LLMs, you might need hundreds to thousands of examples. For vision models, thousands to tens of thousands of images are typical.'
      }
    ],
    resources: [
      {
        type: 'blog',
        title: 'Fine-tuning Guide for Business',
        url: '/resources/fine-tuning-guide'
      },
      {
        type: 'external',
        title: 'OpenAI Fine-tuning Documentation',
        url: 'https://platform.openai.com/docs/guides/fine-tuning'
      }
    ]
  },
  {
    id: 'rag',
    term: 'RAG (Retrieval-Augmented Generation)',
    category: 'Generative AI',
    difficulty: 'advanced',
    shortDefinition: 'A technique that enhances AI responses by retrieving relevant information from external knowledge bases.',
    longDefinition: 'Retrieval-Augmented Generation combines the power of large language models with external knowledge retrieval. When generating a response, the system first retrieves relevant documents or data from a knowledge base, then uses this context to generate more accurate, up-to-date, and grounded responses. RAG reduces hallucinations and enables AI systems to access proprietary or recent information.',
    examples: [
      {
        title: 'Enterprise Knowledge Base',
        description: 'Companies build RAG systems that answer employee questions using internal documentation, reducing support tickets by 70%.',
        industry: 'Operations'
      },
      {
        title: 'Research Assistant',
        description: 'Academic institutions use RAG to help researchers find and synthesize information from thousands of papers.',
        industry: 'Research'
      },
      {
        title: 'Customer Support',
        description: 'Support teams use RAG to provide accurate answers grounded in product documentation, improving resolution rates by 50%.',
        industry: 'Customer Service'
      }
    ],
    relatedTerms: ['large-language-model', 'embedding', 'ai-agent', 'hallucination'],
    faq: [
      {
        question: 'Why use RAG instead of fine-tuning?',
        answer: 'RAG is better for dynamic knowledge that changes frequently, as it retrieves current information. Fine-tuning bakes knowledge into model weights, making updates harder.'
      },
      {
        question: 'What are the challenges with RAG?',
        answer: 'Key challenges include retrieval quality (finding the right documents), context length limits, and ensuring retrieved information is relevant and accurate.'
      }
    ],
    resources: [
      {
        type: 'blog',
        title: 'Building RAG Systems',
        url: '/resources/rag-systems'
      },
      {
        type: 'external',
        title: 'LangChain RAG Tutorial',
        url: 'https://python.langchain.com/docs/use_cases/question_answering/'
      }
    ]
  },
  {
    id: 'ai-agent',
    term: 'AI Agent',
    category: 'Generative AI',
    difficulty: 'advanced',
    shortDefinition: 'An autonomous AI system that can perceive its environment, make decisions, and take actions to achieve goals.',
    longDefinition: 'AI Agents are systems that combine language models with the ability to use tools, access external resources, and execute multi-step workflows autonomously. Unlike simple chatbots, agents can break down complex tasks, make decisions, call APIs, search databases, and iterate on their approach. They represent a shift from passive AI assistants to proactive, goal-oriented systems.',
    examples: [
      {
        title: 'Sales Automation',
        description: 'AI agents research prospects, draft personalized emails, and schedule meetings, increasing sales team productivity by 3x.',
        industry: 'Sales'
      },
      {
        title: 'Data Analysis',
        description: 'Agents automatically clean data, run analyses, and generate reports, reducing analyst workload by 60%.',
        industry: 'Analytics'
      },
      {
        title: 'Customer Onboarding',
        description: 'Agents guide new customers through setup, answer questions, and escalate complex issues, improving activation rates by 45%.',
        industry: 'Customer Success'
      }
    ],
    relatedTerms: ['large-language-model', 'rag', 'prompt-engineering', 'mlops'],
    faq: [
      {
        question: 'What is the difference between a chatbot and an AI agent?',
        answer: 'Chatbots respond to user inputs reactively. AI agents can take initiative, use tools, execute multi-step plans, and work autonomously toward goals.'
      },
      {
        question: 'Are AI agents reliable for production use?',
        answer: 'Agent reliability is improving but still requires careful design, testing, and human oversight. Start with well-defined tasks and gradually expand agent autonomy.'
      }
    ],
    resources: [
      {
        type: 'blog',
        title: 'The Agentic AI Playbook',
        url: '/resources/agentic-ai-playbook'
      },
      {
        type: 'external',
        title: 'LangChain Agents Documentation',
        url: 'https://python.langchain.com/docs/modules/agents/'
      }
    ]
  },
  {
    id: 'neural-network',
    term: 'Neural Network',
    category: 'Machine Learning',
    difficulty: 'intermediate',
    shortDefinition: 'A computing system inspired by biological neural networks, designed to recognize patterns.',
    longDefinition: 'Neural Networks are computing systems loosely inspired by the biological neural networks in animal brains. They consist of interconnected nodes (neurons) organized in layers. Each connection has a weight that adjusts during training, allowing the network to learn patterns from data. Neural networks are the foundation of deep learning and power applications from image recognition to language translation.',
    examples: [
      {
        title: 'Image Recognition',
        description: 'Facebook uses neural networks to automatically tag people in photos with 98% accuracy.',
        industry: 'Social Media'
      },
      {
        title: 'Credit Scoring',
        description: 'Financial institutions use neural networks to assess credit risk, improving approval accuracy by 25%.',
        industry: 'Finance'
      },
      {
        title: 'Recommendation Systems',
        description: 'Netflix uses neural networks to recommend content, driving 80% of viewing activity.',
        industry: 'Entertainment'
      }
    ],
    relatedTerms: ['deep-learning', 'machine-learning', 'artificial-intelligence', 'transformer'],
    faq: [
      {
        question: 'How do neural networks learn?',
        answer: 'Neural networks learn through a process called backpropagation, where errors are calculated and weights are adjusted iteratively to minimize prediction errors.'
      },
      {
        question: 'What are the limitations of neural networks?',
        answer: 'They require large amounts of training data, significant computational resources, and can be difficult to interpret (the "black box" problem).'
      }
    ],
    resources: [
      {
        type: 'blog',
        title: 'Neural Networks Explained',
        url: '/resources/neural-networks'
      },
      {
        type: 'external',
        title: '3Blue1Brown Neural Network Series',
        url: 'https://www.youtube.com/watch?v=aircAruvnKk'
      }
    ]
  }
];

// Add 20 more terms to reach 30 total
export const additionalTerms: GlossaryTerm[] = [
  {
    id: 'computer-vision',
    term: 'Computer Vision',
    category: 'Computer Vision',
    difficulty: 'intermediate',
    shortDefinition: 'AI technology that enables computers to derive meaningful information from visual inputs.',
    longDefinition: 'Computer Vision is a field of AI that trains computers to interpret and understand the visual world. Using digital images from cameras and videos, and deep learning models, machines can accurately identify and classify objects, and react to what they "see." Applications range from facial recognition to autonomous vehicles.',
    examples: [
      {
        title: 'Quality Control',
        description: 'Manufacturers use computer vision to detect defects in products, reducing error rates by 90%.',
        industry: 'Manufacturing'
      },
      {
        title: 'Retail Analytics',
        description: 'Stores use computer vision to track customer behavior and optimize store layouts, increasing sales by 15%.',
        industry: 'Retail'
      },
      {
        title: 'Medical Imaging',
        description: 'Hospitals use computer vision to detect diseases in X-rays and MRIs with radiologist-level accuracy.',
        industry: 'Healthcare'
      }
    ],
    relatedTerms: ['deep-learning', 'neural-network', 'artificial-intelligence'],
    faq: [
      {
        question: 'What are common computer vision tasks?',
        answer: 'Common tasks include image classification, object detection, image segmentation, facial recognition, and optical character recognition (OCR).'
      }
    ],
    resources: [
      {
        type: 'blog',
        title: 'Computer Vision Applications',
        url: '/resources/computer-vision'
      }
    ]
  },
  {
    id: 'supervised-learning',
    term: 'Supervised Learning',
    category: 'Machine Learning',
    difficulty: 'beginner',
    shortDefinition: 'A machine learning approach where models learn from labeled training data.',
    longDefinition: 'Supervised Learning is a type of machine learning where the model is trained on labeled data - input-output pairs where the correct answer is known. The model learns to map inputs to outputs and can then make predictions on new, unseen data. Common tasks include classification (categorizing data) and regression (predicting numerical values).',
    examples: [
      {
        title: 'Email Spam Detection',
        description: 'Models learn from thousands of labeled emails (spam/not spam) to classify new emails automatically.',
        industry: 'Technology'
      },
      {
        title: 'House Price Prediction',
        description: 'Real estate platforms predict property values based on features like location, size, and amenities.',
        industry: 'Real Estate'
      }
    ],
    relatedTerms: ['machine-learning', 'unsupervised-learning', 'reinforcement-learning'],
    faq: [
      {
        question: 'What is the main challenge with supervised learning?',
        answer: 'The need for large amounts of labeled data, which can be expensive and time-consuming to create.'
      }
    ],
    resources: [
      {
        type: 'external',
        title: 'Supervised Learning Guide',
        url: 'https://scikit-learn.org/stable/supervised_learning.html'
      }
    ]
  },
  {
    id: 'unsupervised-learning',
    term: 'Unsupervised Learning',
    category: 'Machine Learning',
    difficulty: 'intermediate',
    shortDefinition: 'Machine learning where models find patterns in unlabeled data without predefined categories.',
    longDefinition: 'Unsupervised Learning is a type of machine learning that finds hidden patterns or structures in data without labeled responses. The model explores the data and draws inferences from datasets consisting of input data without labeled responses. Common techniques include clustering (grouping similar items) and dimensionality reduction.',
    examples: [
      {
        title: 'Customer Segmentation',
        description: 'Retailers group customers based on purchasing behavior to create targeted marketing campaigns.',
        industry: 'Retail'
      },
      {
        title: 'Anomaly Detection',
        description: 'Banks detect unusual transaction patterns that might indicate fraud without predefined fraud examples.',
        industry: 'Finance'
      }
    ],
    relatedTerms: ['machine-learning', 'supervised-learning', 'reinforcement-learning'],
    faq: [
      {
        question: 'When should I use unsupervised learning?',
        answer: 'Use it when you have unlabeled data and want to discover hidden patterns, group similar items, or reduce data complexity.'
      }
    ],
    resources: [
      {
        type: 'external',
        title: 'Unsupervised Learning Tutorial',
        url: 'https://scikit-learn.org/stable/unsupervised_learning.html'
      }
    ]
  },
  {
    id: 'reinforcement-learning',
    term: 'Reinforcement Learning',
    category: 'Machine Learning',
    difficulty: 'advanced',
    shortDefinition: 'Machine learning where agents learn by interacting with an environment and receiving rewards.',
    longDefinition: 'Reinforcement Learning is a type of machine learning where an agent learns to make decisions by taking actions in an environment to maximize cumulative reward. The agent learns through trial and error, receiving positive or negative feedback for its actions. This approach has achieved superhuman performance in games and is used in robotics, autonomous systems, and optimization problems.',
    examples: [
      {
        title: 'Game Playing',
        description: 'AlphaGo used reinforcement learning to defeat world champions in Go, a game more complex than chess.',
        industry: 'Gaming'
      },
      {
        title: 'Robotics',
        description: 'Robots learn to walk, grasp objects, and navigate environments through reinforcement learning.',
        industry: 'Robotics'
      }
    ],
    relatedTerms: ['machine-learning', 'supervised-learning', 'unsupervised-learning'],
    faq: [
      {
        question: 'What makes reinforcement learning different?',
        answer: 'Unlike supervised learning (learning from examples) or unsupervised learning (finding patterns), RL learns from consequences of actions through trial and error.'
      }
    ],
    resources: [
      {
        type: 'external',
        title: 'OpenAI Spinning Up in RL',
        url: 'https://spinningup.openai.com/'
      }
    ]
  },
  {
    id: 'transfer-learning',
    term: 'Transfer Learning',
    category: 'Machine Learning',
    difficulty: 'intermediate',
    shortDefinition: 'Reusing a pre-trained model as the starting point for a new but related task.',
    longDefinition: 'Transfer Learning is a machine learning technique where a model developed for one task is reused as the starting point for a model on a second task. This approach leverages knowledge gained from solving one problem and applies it to a different but related problem, dramatically reducing training time and data requirements.',
    examples: [
      {
        title: 'Medical Imaging',
        description: 'Models pre-trained on general images are adapted to detect specific diseases with limited medical data.',
        industry: 'Healthcare'
      },
      {
        title: 'Language Translation',
        description: 'Models trained on high-resource languages are adapted to translate low-resource languages with limited data.',
        industry: 'Technology'
      }
    ],
    relatedTerms: ['machine-learning', 'fine-tuning', 'deep-learning'],
    faq: [
      {
        question: 'When should I use transfer learning?',
        answer: 'Use it when you have limited training data, want to reduce training time, or are working on a task similar to one with available pre-trained models.'
      }
    ],
    resources: [
      {
        type: 'external',
        title: 'Transfer Learning Guide',
        url: 'https://www.tensorflow.org/tutorials/images/transfer_learning'
      }
    ]
  },
  {
    id: 'tokenization',
    term: 'Tokenization',
    category: 'Natural Language Processing',
    difficulty: 'beginner',
    shortDefinition: 'Breaking down text into smaller units (tokens) for processing by AI models.',
    longDefinition: 'Tokenization is the process of converting text into smaller pieces called tokens, which can be words, subwords, or characters. This is a fundamental preprocessing step in NLP that allows models to process and understand text. Modern language models use sophisticated tokenization methods like Byte-Pair Encoding (BPE) to handle various languages and rare words efficiently.',
    examples: [
      {
        title: 'Text Analysis',
        description: 'Sentiment analysis systems tokenize customer reviews to understand opinions at word and phrase level.',
        industry: 'Marketing'
      },
      {
        title: 'Machine Translation',
        description: 'Translation systems tokenize source text to process and translate it accurately into target languages.',
        industry: 'Technology'
      }
    ],
    relatedTerms: ['natural-language-processing', 'embedding', 'large-language-model'],
    faq: [
      {
        question: 'Why is tokenization important?',
        answer: 'Tokenization converts text into a format that models can process numerically, enabling all downstream NLP tasks.'
      }
    ],
    resources: [
      {
        type: 'external',
        title: 'Tokenization Explained',
        url: 'https://huggingface.co/docs/transformers/tokenizer_summary'
      }
    ]
  },
  {
    id: 'embedding',
    term: 'Embedding',
    category: 'Natural Language Processing',
    difficulty: 'intermediate',
    shortDefinition: 'Numerical representations of data (text, images) that capture semantic meaning.',
    longDefinition: 'Embeddings are dense vector representations of data that capture semantic relationships. In NLP, word embeddings represent words as vectors where similar words have similar vectors. This allows models to understand that "king" and "queen" are related, or that "Paris" and "France" have a capital-country relationship. Embeddings are fundamental to modern AI systems.',
    examples: [
      {
        title: 'Semantic Search',
        description: 'Search engines use embeddings to find documents similar in meaning, not just matching keywords.',
        industry: 'Technology'
      },
      {
        title: 'Recommendation Systems',
        description: 'Spotify uses embeddings to recommend songs based on semantic similarity, not just genre tags.',
        industry: 'Entertainment'
      }
    ],
    relatedTerms: ['natural-language-processing', 'tokenization', 'rag'],
    faq: [
      {
        question: 'How are embeddings created?',
        answer: 'Embeddings are learned during model training. Models like Word2Vec, GloVe, or transformer models learn to create embeddings that capture semantic relationships.'
      }
    ],
    resources: [
      {
        type: 'external',
        title: 'Understanding Embeddings',
        url: 'https://platform.openai.com/docs/guides/embeddings'
      }
    ]
  },
  {
    id: 'transformer',
    term: 'Transformer',
    category: 'Machine Learning',
    difficulty: 'advanced',
    shortDefinition: 'A neural network architecture that revolutionized NLP using attention mechanisms.',
    longDefinition: 'Transformers are a type of neural network architecture introduced in 2017 that use self-attention mechanisms to process sequential data. Unlike previous architectures, transformers can process entire sequences in parallel, making them highly efficient. They power modern language models like GPT, BERT, and T5, and have also been adapted for computer vision and other domains.',
    examples: [
      {
        title: 'Language Translation',
        description: 'Google Translate uses transformer models to achieve near-human translation quality across 100+ languages.',
        industry: 'Technology'
      },
      {
        title: 'Content Generation',
        description: 'GPT models based on transformers generate human-like text for various applications.',
        industry: 'Content Creation'
      }
    ],
    relatedTerms: ['large-language-model', 'gpt', 'attention-mechanism', 'neural-network'],
    faq: [
      {
        question: 'Why are transformers so important?',
        answer: 'Transformers enabled training much larger models on more data by processing sequences in parallel, leading to breakthrough performance in NLP and beyond.'
      }
    ],
    resources: [
      {
        type: 'external',
        title: 'Attention Is All You Need (Original Paper)',
        url: 'https://arxiv.org/abs/1706.03762'
      }
    ]
  },
  {
    id: 'attention-mechanism',
    term: 'Attention Mechanism',
    category: 'Machine Learning',
    difficulty: 'advanced',
    shortDefinition: 'A technique that allows models to focus on relevant parts of input when making predictions.',
    longDefinition: 'Attention Mechanisms allow neural networks to focus on specific parts of the input when producing each part of the output. Instead of compressing all information into a fixed representation, attention lets models dynamically select what is relevant. This breakthrough enabled transformers and dramatically improved performance in translation, summarization, and other sequence tasks.',
    examples: [
      {
        title: 'Machine Translation',
        description: 'When translating "The cat sat on the mat" to French, attention helps the model focus on "cat" when generating "chat".',
        industry: 'Technology'
      },
      {
        title: 'Image Captioning',
        description: 'Models use attention to focus on relevant image regions when generating each word of a caption.',
        industry: 'Computer Vision'
      }
    ],
    relatedTerms: ['transformer', 'neural-network', 'large-language-model'],
    faq: [
      {
        question: 'What problem does attention solve?',
        answer: 'Attention solves the bottleneck problem of compressing entire sequences into fixed-size representations, allowing models to selectively focus on relevant information.'
      }
    ],
    resources: [
      {
        type: 'external',
        title: 'Attention Mechanism Explained',
        url: 'https://jalammar.github.io/visualizing-neural-machine-translation-mechanics-of-seq2seq-models-with-attention/'
      }
    ]
  },
  {
    id: 'hallucination',
    term: 'Hallucination (AI)',
    category: 'Generative AI',
    difficulty: 'beginner',
    shortDefinition: 'When AI models generate false or nonsensical information presented as fact.',
    longDefinition: 'AI Hallucination refers to instances where language models generate information that sounds plausible but is actually incorrect, fabricated, or nonsensical. This occurs because models are trained to generate likely text continuations, not to verify factual accuracy. Hallucinations are a key challenge in deploying AI systems for critical applications.',
    examples: [
      {
        title: 'False Citations',
        description: 'ChatGPT might generate plausible-sounding but non-existent academic paper citations.',
        industry: 'Research'
      },
      {
        title: 'Fabricated Facts',
        description: 'Models might confidently state incorrect historical dates or statistics.',
        industry: 'Education'
      }
    ],
    relatedTerms: ['large-language-model', 'gpt', 'rag'],
    faq: [
      {
        question: 'How can I reduce hallucinations?',
        answer: 'Use techniques like RAG (grounding responses in retrieved documents), fine-tuning on accurate data, prompt engineering, and always verify critical information.'
      }
    ],
    resources: [
      {
        type: 'blog',
        title: 'Understanding AI Hallucinations',
        url: '/resources/ai-hallucinations'
      }
    ]
  },
  {
    id: 'ai-bias',
    term: 'AI Bias',
    category: 'AI Ethics',
    difficulty: 'beginner',
    shortDefinition: 'Systematic errors in AI systems that create unfair outcomes for certain groups.',
    longDefinition: 'AI Bias occurs when AI systems produce systematically prejudiced results due to biased training data, flawed algorithms, or biased human decisions in the development process. This can lead to unfair outcomes in hiring, lending, criminal justice, and other domains. Addressing bias is critical for building fair and trustworthy AI systems.',
    examples: [
      {
        title: 'Hiring Algorithms',
        description: 'Amazon discontinued an AI recruiting tool that showed bias against women due to historical hiring patterns in training data.',
        industry: 'HR'
      },
      {
        title: 'Facial Recognition',
        description: 'Some facial recognition systems show higher error rates for people of color due to unrepresentative training data.',
        industry: 'Security'
      }
    ],
    relatedTerms: ['artificial-intelligence', 'explainable-ai', 'machine-learning'],
    faq: [
      {
        question: 'How can we prevent AI bias?',
        answer: 'Use diverse training data, test for bias across demographic groups, involve diverse teams in development, and implement fairness constraints in models.'
      }
    ],
    resources: [
      {
        type: 'blog',
        title: 'Addressing AI Bias',
        url: '/resources/ai-bias'
      }
    ]
  },
  {
    id: 'explainable-ai',
    term: 'Explainable AI (XAI)',
    category: 'AI Ethics',
    difficulty: 'intermediate',
    shortDefinition: 'AI systems designed to provide understandable explanations for their decisions.',
    longDefinition: 'Explainable AI refers to methods and techniques that make AI decision-making processes transparent and interpretable to humans. As AI systems are deployed in critical domains like healthcare and finance, understanding why a model made a particular decision becomes essential for trust, debugging, and regulatory compliance.',
    examples: [
      {
        title: 'Credit Decisions',
        description: 'Banks use XAI to explain why loan applications were approved or denied, meeting regulatory requirements.',
        industry: 'Finance'
      },
      {
        title: 'Medical Diagnosis',
        description: 'Healthcare AI systems highlight which image features led to a diagnosis, helping doctors verify and trust results.',
        industry: 'Healthcare'
      }
    ],
    relatedTerms: ['artificial-intelligence', 'ai-bias', 'machine-learning'],
    faq: [
      {
        question: 'Why is explainability important?',
        answer: 'Explainability builds trust, enables debugging, meets regulatory requirements, and helps identify and fix biases in AI systems.'
      }
    ],
    resources: [
      {
        type: 'external',
        title: 'DARPA XAI Program',
        url: 'https://www.darpa.mil/program/explainable-artificial-intelligence'
      }
    ]
  },
  {
    id: 'mlops',
    term: 'MLOps',
    category: 'Machine Learning',
    difficulty: 'intermediate',
    shortDefinition: 'Practices for deploying, monitoring, and maintaining machine learning models in production.',
    longDefinition: 'MLOps (Machine Learning Operations) is a set of practices that combines machine learning, DevOps, and data engineering to deploy and maintain ML models in production reliably and efficiently. It includes model versioning, automated testing, continuous training, monitoring, and governance. MLOps is essential for scaling AI from experiments to business-critical applications.',
    examples: [
      {
        title: 'Model Monitoring',
        description: 'E-commerce companies monitor recommendation model performance and retrain when accuracy drops.',
        industry: 'Retail'
      },
      {
        title: 'Automated Retraining',
        description: 'Fraud detection systems automatically retrain on new fraud patterns to maintain effectiveness.',
        industry: 'Finance'
      }
    ],
    relatedTerms: ['machine-learning', 'ai-agent', 'fine-tuning'],
    faq: [
      {
        question: 'Why is MLOps necessary?',
        answer: 'MLOps ensures models remain accurate over time, handles model versioning, enables collaboration, and maintains compliance and governance.'
      }
    ],
    resources: [
      {
        type: 'external',
        title: 'Google MLOps Guide',
        url: 'https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning'
      }
    ]
  }
];

export const allTerms = [...glossaryTerms, ...additionalTerms];

export const categories = [
  'All',
  'Fundamentals',
  'Machine Learning',
  'Natural Language Processing',
  'Generative AI',
  'Computer Vision',
  'AI Ethics'
];

export const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
