import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  SectionList,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Modified syllabus data structure to work with SectionList
const SYLLABUS = [
  {
    title: 'Foundation',
    data: [
      {id: '1', detail: 'JavaScript Basics', completed: false},
      {id: '1.1', detail: 'Variables, Data Types, Operators', completed: false},
      {id: '1.2', detail: 'Functions, Scope, and Hoisting', completed: false},
      {id: '1.3', detail: 'Closures, Promises, Async/Await', completed: false},
      {
        id: '1.4',
        detail: 'Event Loop & JavaScript’s Async Nature',
        completed: false,
      },

      {id: '2', detail: 'Node.js Runtime', completed: false},
      {id: '2.1', detail: 'Introduction to Node.js', completed: false},
      {id: '2.2', detail: 'V8 Engine & Runtime Environment', completed: false},
      {
        id: '2.3',
        detail: 'Asynchronous I/O, Event-Driven Architecture',
        completed: false,
      },
      {
        id: '2.4',
        detail: 'Global Objects & Modules (require/export)',
        completed: false,
      },

      {id: '3', detail: 'Databases', completed: false},
      {
        id: '3.1',
        detail: 'Introduction to Databases (NoSQL vs SQL)',
        completed: false,
      },
      {
        id: '3.2',
        detail: 'MongoDB: Document-based, Schema Design, Indexing',
        completed: false,
      },
      {id: '3.3', detail: 'MongoDB: CRUD Operations', completed: false},
      {
        id: '3.4',
        detail: 'MongoDB: Aggregation Pipeline, Relationships',
        completed: false,
      },
      {
        id: '3.5',
        detail: 'PostgreSQL: SQL Queries, Transactions',
        completed: false,
      },
      {
        id: '3.6',
        detail: 'PostgreSQL: Joins, Normalization, Indexing',
        completed: false,
      },
      {
        id: '3.7',
        detail: 'PostgreSQL: Complex Queries, Triggers, Functions',
        completed: false,
      },
      {
        id: '3.8',
        detail: 'MongoDB vs PostgreSQL: Use Cases, Performance',
        completed: false,
      },

      {id: '4', detail: 'TypeScript Beginner to Advanced', completed: false},
      {
        id: '4.1',
        detail: 'Static Typing, Interfaces, Enums, Generics',
        completed: false,
      },
      {
        id: '4.2',
        detail: 'Type Inference, Type Guards, Utility Types',
        completed: false,
      },
      {
        id: '4.3',
        detail: 'Advanced Types: Union, Intersection Types',
        completed: false,
      },
      {
        id: '4.4',
        detail: 'TypeScript in Node.js/React Projects',
        completed: false,
      },
    ],
  },
  {
    title: 'Backend',
    data: [
      {id: '1', detail: 'Backend Communication Protocols', completed: false},
      {
        id: '1.1',
        detail: 'HTTP Basics: Request/Response Cycle',
        completed: false,
      },
      {id: '1.2', detail: 'REST APIs & GraphQL Overview', completed: false},

      {id: '2', detail: 'Express.js: Basic to Advanced', completed: false},
      {id: '2.1', detail: 'Basic Routing, Middleware Usage', completed: false},
      {id: '2.2', detail: 'Express Middleware Pipeline', completed: false},
      {id: '2.3', detail: 'Error Handling, Global Catches', completed: false},
      {id: '2.4', detail: 'Authentication & Authorization', completed: false},

      {id: '3', detail: 'ORMs', completed: false},
      {
        id: '3.1',
        detail: 'Mongoose for MongoDB: Schema Definition',
        completed: false,
      },
      {
        id: '3.2',
        detail: 'Prisma for PostgreSQL: Schema, Queries, Migrations',
        completed: false,
      },

      {id: '4', detail: 'Middlewares, Routes, Status Codes', completed: false},
      {id: '4.1', detail: 'Writing Reusable Middlewares', completed: false},
      {
        id: '4.2',
        detail: 'Managing Routes with Express Router',
        completed: false,
      },
      {
        id: '4.3',
        detail: 'Understanding HTTP Status Codes, Error Codes',
        completed: false,
      },

      {id: '5', detail: 'Zod for Validation', completed: false},
      {
        id: '5.1',
        detail: 'Schema Definition and Validation using Zod',
        completed: false,
      },

      {id: '6', detail: 'Monorepos and Turborepo', completed: false},
      {id: '6.1', detail: 'Monorepo Structures', completed: false},
      {
        id: '6.2',
        detail: 'Using Turborepo to manage backend & frontend packages',
        completed: false,
      },

      {id: '7', detail: 'Serverless Backends', completed: false},
      {
        id: '7.1',
        detail: 'Introduction to Serverless Architecture',
        completed: false,
      },
      {
        id: '7.2',
        detail: 'AWS Lambda Functions, Netlify Functions',
        completed: false,
      },

      {id: '8', detail: 'OpenAPI Specifications', completed: false},
      {
        id: '8.1',
        detail: 'Writing API Definitions Using OpenAPI',
        completed: false,
      },
      {
        id: '8.2',
        detail: 'Generating Client Libraries from OpenAPI Specs',
        completed: false,
      },

      {
        id: '9',
        detail: 'Authentication Using External Libraries',
        completed: false,
      },
      {id: '9.1', detail: 'Passport.js, JWT Authentication', completed: false},
      {
        id: '9.2',
        detail: 'OAuth Integration (Google, GitHub, etc.)',
        completed: false,
      },

      {
        id: '10',
        detail: 'Scaling Node.js & Performance Benchmarks',
        completed: false,
      },
      {
        id: '10.1',
        detail: 'Load Testing & Profiling (using Artillery or K6)',
        completed: false,
      },
      {
        id: '10.2',
        detail: 'Caching Strategies (using Redis)',
        completed: false,
      },
      {
        id: '10.3',
        detail: 'Node.js Clustering & Worker Threads',
        completed: false,
      },

      {id: '11', detail: 'Deploying NPM Packages', completed: false},
      {
        id: '11.1',
        detail: 'Building and Deploying Custom NPM Packages',
        completed: false,
      },
    ],
  },
  {
    title: 'Frontend',
    data: [
      {
        id: '1',
        detail: 'Reconcilers and Frontend Frameworks',
        completed: false,
      },
      {id: '1.1', detail: "Virtual DOM & React's Reconciler", completed: false},
      {
        id: '1.2',
        detail: 'Understanding JSX and Rendering Flow',
        completed: false,
      },

      {id: '2', detail: 'React.js: Beginner to Advanced', completed: false},
      {id: '2.1', detail: 'React Components, Props, State', completed: false},
      {
        id: '2.2',
        detail: 'Hooks: useState, useEffect, useReducer',
        completed: false,
      },
      {id: '2.3', detail: 'React Context API & Custom Hooks', completed: false},

      {id: '3', detail: 'State Management using Recoil', completed: false},
      {
        id: '3.1',
        detail: 'Recoil Overview, Atoms, Selectors',
        completed: false,
      },
      {
        id: '3.2',
        detail: 'Global State Management with Recoil',
        completed: false,
      },

      {id: '4', detail: 'CSS Essentials', completed: false},
      {id: '4.1', detail: 'Flexbox, Grid Layout', completed: false},
      {id: '4.2', detail: 'Responsive Design, Media Queries', completed: false},

      {
        id: '5',
        detail: 'UI Frameworks: Tailwind CSS Deep Dive',
        completed: false,
      },
      {id: '5.1', detail: 'Utility-First CSS with Tailwind', completed: false},
      {
        id: '5.2',
        detail: 'Building Responsive and Performant UIs',
        completed: false,
      },

      {id: '6', detail: 'Containerization with Docker', completed: false},
      {id: '6.1', detail: 'Dockerizing a React Application', completed: false},
      {
        id: '6.2',
        detail: 'Docker Compose for Multi-Service Apps',
        completed: false,
      },

      {id: '7', detail: 'Next.js Framework', completed: false},
      {
        id: '7.1',
        detail: 'Server-Side Rendering (SSR), Static Site Generation (SSG)',
        completed: false,
      },
      {
        id: '7.2',
        detail: 'API Routes, Middleware in Next.js',
        completed: false,
      },

      {id: '8', detail: 'Custom React Hooks', completed: false},
      {id: '8.1', detail: 'Writing and Reusing Custom Hooks', completed: false},

      {id: '9', detail: 'Authentication in Next.js', completed: false},
      {
        id: '9.1',
        detail: 'Using Next-Auth for Authentication',
        completed: false,
      },
    ],
  },
  {
    title: 'Basic DevOps',
    data: [
      {id: '1', detail: 'Docker End to End', completed: false},
      {
        id: '1.1',
        detail: 'Dockerfile, Docker Compose, Docker Hub',
        completed: false,
      },
      {id: '1.2', detail: 'Best Practices for Docker Images', completed: false},

      {id: '2', detail: 'Deploying to AWS Servers', completed: false},
      {
        id: '2.1',
        detail: 'EC2 Instances, Setting Up Cloud Servers',
        completed: false,
      },
      {
        id: '2.2',
        detail: 'Deploying Full-Stack Applications on AWS',
        completed: false,
      },

      {id: '3', detail: 'Exploring Newer Clouds', completed: false},
      {id: '3.1', detail: 'Deploying to Fly.io and Remix', completed: false},
      {id: '3.2', detail: 'Cloud Optimization Techniques', completed: false},

      {id: '4', detail: 'Nginx and Reverse Proxies', completed: false},
      {
        id: '4.1',
        detail: 'Setting up Nginx as a Reverse Proxy',
        completed: false,
      },
    ],
  },
  {
    title: 'Projects',
    data: [
      {id: '1', detail: 'GSoC Project: Issue Solving', completed: false},
      {
        id: '1.1',
        detail:
          'Set up a real-world open-source project from Google Summer of Code',
        completed: false,
      },
      {
        id: '1.2',
        detail: 'Solve complex issues and contribute to open-source projects',
        completed: false,
      },

      {
        id: '2',
        detail: 'Building a Paytm/Wallet End-to-End Application',
        completed: false,
      },
      {
        id: '2.1',
        detail: 'User Authentication, Payment Gateway Integration',
        completed: false,
      },
      {
        id: '2.2',
        detail:
          'Wallet Management System with Backend in Node.js and Frontend in React/Next.js',
        completed: false,
      },
    ],
  },
  {
    title: 'Advanced Backend',
    data: [
      {
        id: '1',
        detail: 'Advanced Backend Communication Protocols',
        completed: false,
      },
      {id: '1.1', detail: 'Deep Dive into gRPC', completed: false},
      {id: '1.2', detail: 'REST vs gRPC', completed: false},

      {id: '2', detail: 'Message Queues and PubSubs', completed: false},
      {
        id: '2.1',
        detail: 'Kafka: Producer-Consumer, Topic-Partioning',
        completed: false,
      },
      {
        id: '2.2',
        detail: 'RabbitMQ: Queues and Message Brokers',
        completed: false,
      },

      {id: '3', detail: 'Proxies and Load Balancers', completed: false},
      {
        id: '3.1',
        detail: 'Nginx, HAProxy, and Load Balancing Strategies',
        completed: false,
      },
      {id: '3.2', detail: 'Reverse Proxies and Caching', completed: false},

      {id: '4', detail: 'Redis Deep Dive', completed: false},
      {
        id: '4.1',
        detail:
          'Redis Data Structures, PubSub, Caching, and Session Management',
        completed: false,
      },

      {id: '5', detail: 'Kafka Deep Dive', completed: false},
      {id: '5.1', detail: 'Kafka Internals, Event Streaming', completed: false},
      {id: '5.2', detail: 'Kafka with Node.js', completed: false},

      {
        id: '6',
        detail: 'Common Design Patterns in JavaScript',
        completed: false,
      },
      {
        id: '6.1',
        detail: 'Singleton, Factory, Observer Patterns',
        completed: false,
      },
      {
        id: '6.2',
        detail: 'Dependency Injection, Repository Pattern',
        completed: false,
      },

      {id: '7', detail: 'Advanced DB Concepts', completed: false},
      {id: '7.1', detail: 'Indexing, Query Optimization', completed: false},
      {
        id: '7.2',
        detail: 'Data Normalization, ACID Principles',
        completed: false,
      },

      {id: '8', detail: 'Scaling Techniques', completed: false},
      {
        id: '8.1',
        detail: 'Sharding, Replication, Resiliency in Databases',
        completed: false,
      },
      {id: '8.2', detail: 'Horizontal vs Vertical Scaling', completed: false},

      {id: '9', detail: 'Rate Limiting & DDoS Protection', completed: false},
      {
        id: '9.1',
        detail: 'Implementing Rate Limiting using Redis',
        completed: false,
      },
      {
        id: '9.2',
        detail: 'Protecting APIs from DDoS Attacks',
        completed: false,
      },

      {id: '10', detail: 'Testing Node.js Applications', completed: false},
      {
        id: '10.1',
        detail: 'Unit Testing with Jest and Mocha',
        completed: false,
      },
      {id: '10.2', detail: 'Integration and E2E Testing', completed: false},

      {id: '11', detail: 'Real-Time Communication', completed: false},
      {
        id: '11.1',
        detail: 'Websockets and Polling Techniques',
        completed: false,
      },
      {id: '11.2', detail: 'Introduction to WebRTC', completed: false},

      {id: '12', detail: 'CAP Theorem', completed: false},
      {
        id: '12.1',
        detail: 'Consistency, Availability, Partition Tolerance',
        completed: false,
      },

      {id: '13', detail: 'Capacity Estimation', completed: false},
      {
        id: '13.1',
        detail: 'Estimating Backend Server Capacities for Scaling',
        completed: false,
      },
    ],
  },
  {
    title: 'Advanced DevOps',
    data: [
      {
        id: '1',
        detail: 'Container Orchestration with Docker Swarm & Kubernetes',
        completed: false,
      },
      {id: '1.1', detail: 'Introduction to Kubernetes (K8s)', completed: false},
      {
        id: '1.2',
        detail: 'Running Microservices in K8s Cluster',
        completed: false,
      },

      {id: '2', detail: 'CI/CD Pipelines', completed: false},
      {
        id: '2.1',
        detail:
          'Setting up Continuous Integration/Deployment using Jenkins, CircleCI',
        completed: false,
      },

      {id: '3', detail: 'Monitoring Systems', completed: false},
      {
        id: '3.1',
        detail: 'Setting up Prometheus and Grafana',
        completed: false,
      },
      {id: '3.2', detail: 'Monitoring Performance Metrics', completed: false},

      {id: '4', detail: 'Serverless Deep Dive', completed: false},
      {id: '4.1', detail: 'AWS Lambda Functions in Detail', completed: false},

      {id: '5', detail: 'AWS Constructs', completed: false},
      {id: '5.1', detail: 'EC2, S3, CloudFront for CDN', completed: false},
      {id: '5.2', detail: 'EKS, Elastic Kubernetes Service', completed: false},
    ],
  },
  {
    title: 'Advanced Projects',
    data: [
      {id: '1', detail: 'Zerodha Clone: End-to-End', completed: false},
      {
        id: '1.1',
        detail:
          'Full Trading App with Authentication, Real-time Market Data, and Transactions',
        completed: false,
      },

      {id: '2', detail: 'Zapier Automation Tool: End-to-End', completed: false},
      {
        id: '2.1',
        detail: 'Workflow Automation with Node.js and React',
        completed: false,
      },
      {
        id: '2.2',
        detail: 'Integration with Third-Party APIs',
        completed: false,
      },

      {id: '3', detail: 'Real-World Open-Source Projects', completed: false},
      {
        id: '3.1',
        detail:
          'Contribution to Large-Scale OSS Projects (e.g., Node.js Core, React.js Library)',
        completed: false,
      },
    ],
  },
];

export default function App() {
  const [syllabus, setSyllabus] = useState(SYLLABUS);

  // Load stored data when the app loads
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem('syllabus');
      if (storedTodos) {
        setSyllabus(JSON.parse(storedTodos));
      } else {
        await AsyncStorage.setItem('syllabus', JSON.stringify(SYLLABUS));
      }
    } catch (error) {
      console.error('Error loading syllabus:', error);
    }
  };

  const toggleComplete = async (sectionTitle, id) => {
    try {
      const updatedSyllabus = syllabus.map(section => {
        if (section.title === sectionTitle) {
          return {
            ...section,
            data: section.data.map(item =>
              item.id === id ? {...item, completed: !item.completed} : item,
            ),
          };
        }
        return section;
      });

      setSyllabus(updatedSyllabus);
      await AsyncStorage.setItem('syllabus', JSON.stringify(updatedSyllabus));
    } catch (error) {
      console.error('Error updating syllabus:', error);
    }
  };

  const clearTodos = async () => {
    try {
      const resetSyllabus = SYLLABUS.map(section => ({
        ...section,
        data: section.data.map(item => ({...item, completed: false})),
      }));
      setSyllabus(resetSyllabus);
      await AsyncStorage.setItem('syllabus', JSON.stringify(resetSyllabus));
    } catch (error) {
      console.error('Error clearing syllabus:', error);
    }
  };

  const renderItem = ({item, section}) => (
    <TouchableOpacity onPress={() => toggleComplete(section.title, item.id)}>
      <Text style={[styles.detail, item.completed && styles.completed]}>
        {item.id + ': '}
        {item.detail}
      </Text>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({section: {title}}) => (
    <Text style={styles.header}>{title}</Text>
  );

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={syllabus}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />
      <Button title="Clear Completed" onPress={clearTodos} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  detail: {
    fontSize: 16,
    padding: 10,
    marginLeft: 10,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gainsboro',
  },
});
