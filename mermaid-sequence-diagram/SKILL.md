---
name: mermaid-sequence-diagram
description: Create sequence diagram as a code through Mermaid.js and opens Mermaid live editor with the diagram open. Use this skill when the user asks for sequence diagram of some flow where multiple components interact with each other. 
license: Complete terms in LICENSE.txt
---

# Analysing flow
Analyse the flow of the system and identify the components involved in the interaction. This could include users, services, databases, APIs, etc. These components will be represented as entities in the sequence diagram. 

# Defining interactions
Identify the interactions between the components. This includes the messages or data being exchanged, the order of interactions, and any conditions, loops and alternatives that may exist. Each interaction will be represented as an arrow in the sequence diagram.

# Mermaid syntax
Open Mermaid documentation at link https://mermaid.js.org/syntax/sequenceDiagram.html to understand the syntax and structure of Mermaid code for sequence diagrams. Familiarize yourself with how to define entities, interactions, activation bars, notes, and other elements that can be used in the diagram.

# Creating Mermaid code
Based on the identified components and interactions, create the Mermaid code for the sequence diagram. This involves defining the entities, their interactions, and any additional details such as activation bars, notes, or comments. Use background highlighting to differentiate between different types of interactions or components if necessary to make the diagram clearer. Print the code in the output so that it can be easily copied and pasted into the Mermaid live editor.

# Opening Mermaid live editor
Use Node.js script to execute  ```node pako_compress_and_open_in_mermaid_live_editor.js "mermaid_code"``` and replace mermaid_code placeholder with generated mermaid sequence diagram to receive the URL. 

Open the URL at https://mermaid.live/edit#pako:output_of_script_call where you replace "output_of_script_call" with actual output of the script pako_compress_and_open_in_mermaid_live_editor.js.