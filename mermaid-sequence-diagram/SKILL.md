---
name: mermaid-sequence-diagram
description: Create sequence diagram as a code through Mermaid.js, save it as a markdown file and also generate SVG graphic representation. Use this skill when the user asks for sequence diagram of some flow where multiple components interact with each other. 
license: Complete terms in LICENSE.txt
---

# Check prerequisites
Before creating a sequence diagram using Mermaid.js, ensure that you have the following prerequisites:
- ```npm install -g @mermaid-js/mermaid-cli```

# Analysing flow
Analyse the flow of the system and identify the components involved in the interaction. This could include users, services, databases, APIs, etc. These components will be represented as entities in the sequence diagram. 

# Defining interactions
Identify the interactions between the components. This includes the messages or data being exchanged, the order of interactions, and any conditions, loops and alternatives that may exist. Each interaction will be represented as an arrow in the sequence diagram.

# Mermaid syntax
Open Mermaid documentation at link https://mermaid.js.org/syntax/sequenceDiagram.html to understand the syntax and structure of Mermaid code for sequence diagrams. Familiarize yourself with how to define entities, interactions, activation bars, notes, and other elements that can be used in the diagram.

# Creating Mermaid code
Based on the identified components and interactions, create the Mermaid code for the sequence diagram. This involves defining the entities, their interactions, and any additional details such as activation bars, notes, or comments. Use background highlighting to differentiate between different types of interactions or components if necessary to make the diagram clearer. Save the code as a feature_name_sequence.md file, where you replace feature_name with the name of the feature or flow being represented in the diagram.

# Generating SVG
Use the Mermaid CLI to generate an SVG graphic representation of the sequence diagram from the Mermaid code. Run the following command in your terminal, replacing feature_name with the name of your Mermaid markdown file:
```mmdc -i feature_name_sequence.md -o feature_name_sequence.svg```
