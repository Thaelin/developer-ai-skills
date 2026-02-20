---
name: mermaid-class-diagram
description: Create class diagram as a code through Mermaid.js from OOP source code, save it as a markdown file and also generate SVG graphic representation. Use this skill when the user asks for a class diagram representing OOP relationships such as inheritance, composition, aggregation, or association between classes. User can request it for specific feature or in general.
license: Complete terms in LICENSE.txt
---

# Check prerequisites
Before creating a class diagram using Mermaid.js, ensure that you have the following prerequisites:
- ```npm install -g @mermaid-js/mermaid-cli```

# Analysing OOP source code
Analyse the provided OOP source code and identify all relevant classes, interfaces, abstract classes, and enumerations. Take note of:
- **Class names** and their visibility modifiers
- **Fields and properties** with their types and access modifiers (public, private, protected)
- **Methods** with their signatures, parameters, return types, and access modifiers
- **Constructors** and any static members

# Identifying OOP relationships
Based on the source code analysis, identify the relationships between the classes:
- **Inheritance** (`--|>`) — a class extends another class or an interface extends another interface
- **Interface implementation** (`..|>`) — a class implements an interface
- **Composition** (`*--`) — a class owns another class (strong lifecycle dependency)
- **Aggregation** (`o--`) — a class references another class (weak lifecycle dependency)
- **Association** (`-->`) — a class uses another class in a field or property
- **Dependency** (`..>`) — a class depends on another class (e.g., method parameter or local variable)

# Source language considerations
Take the source programming language into account when analyzing the code. In a monorepo, multiple languages may coexist — for example a Java backend, a TypeScript frontend, and a Python data pipeline all in the same repository. In that case, analyse each language separately, map their OOP constructs to unified UML concepts, and then represent all classes in a single diagram using namespaces to distinguish language boundaries:
- **Java / C#** — consider access modifiers (`public`, `private`, `protected`, `internal`), interfaces, abstract classes, generics, and annotations/attributes
- **Python** — consider duck typing, `__init__` constructors, `@dataclass`, `@abstractmethod`, type hints, and multiple inheritance
- **TypeScript / JavaScript** — consider `interface`, `type`, `abstract`, optional fields, generics, and ES6 class syntax
- **C++** — consider multiple inheritance, virtual methods, access specifiers, and header vs. implementation separation
- For any other language, apply equivalent OOP concepts mapped to Mermaid's class diagram notation

# Mermaid syntax
Open Mermaid documentation at https://mermaid.js.org/syntax/classDiagram.html to understand the syntax and structure of Mermaid code for class diagrams. Familiarize yourself with how to define classes, members, methods, relationships, namespaces, and notes.

# Creating Mermaid code
Based on the identified classes and relationships, create the Mermaid code for the class diagram. Follow these guidelines:
- Use `classDiagram` as the diagram type declaration
- Represent each class with its fields and methods, including correct visibility symbols (`+` public, `-` private, `#` protected, `~` package/internal)
- Mark abstract classes with `<<abstract>>` and interfaces with `<<interface>>` stereotypes
- Mark enumerations with `<<enumeration>>` stereotype and list their values
- In a monorepo, group classes by language or module using `namespace` blocks (e.g., `namespace Java`, `namespace TypeScript`) to make language boundaries explicit
- Add notes to clarify complex relationships or design decisions
- Use background highlighting (`rect` blocks) to visually group layers such as domain model, services, and repositories if it improves clarity

Save the code as a `feature_name_class.md` file, where you replace `feature_name` with the name of the feature or module being represented in the diagram.

# Generating SVG
Use the Mermaid CLI to generate an SVG graphic representation of the class diagram from the Mermaid code. Run the following command in your terminal, replacing `feature_name` with the name of your Mermaid markdown file:
```mmdc -i feature_name_class.md -o feature_name_class.svg```
