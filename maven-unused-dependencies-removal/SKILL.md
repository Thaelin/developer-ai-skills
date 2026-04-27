---
name: maven-unused-dependencies-removal
description: |
  Detect Maven dependencies declared in pom.xml that are not used by the project,
  verify them with a deep scan, remove only confirmed unused dependencies, and run
  Maven build and tests to prove the project still compiles and passes. Use when:
  find unused Maven dependencies, clean pom.xml, remove dead dependencies, analyze
  pom.xml usage, validate dependency cleanup, run mvn dependency:analyze, verify
  Maven build after dependency removal. Do not use for Gradle projects.
argument-hint: Analyze this Maven project for unused pom.xml dependencies and verify removal safely
user-invocable: true
disable-model-invocation: false
---

# Maven Unused Dependencies Removal

Use this skill to identify dependencies declared in `pom.xml` that are likely unused, validate each candidate with a deep scan, and only then remove dependencies that survive build and test verification.

## Scope

This skill supports Maven projects only.

If the workspace does not contain a `pom.xml`, stop and report that the skill is not applicable.

## Required Outcome

For every dependency removed, provide all of the following:

- The module and `pom.xml` where it was declared.
- Why it was considered unused.
- What deep-scan checks were performed.
- Which build and test commands were executed.
- Whether the dependency was removed, retained, or requires manual review.

Do not claim a dependency is unused based only on `mvn dependency:analyze`.

## Required Workflow

Follow these steps in order.

### Step 1: Discover the Maven structure

1. Find the root `pom.xml` and all module `pom.xml` files.
2. Determine whether the project is single-module or multi-module.
3. Identify active profiles, parent POMs, imported BOMs, generated sources, and annotation processors that can affect dependency usage.

### Step 2: Build an initial candidate list

Use Maven analysis as a first-pass signal, not as proof.

Preferred commands:

```powershell
mvn -q dependency:analyze
```

or, for multi-module projects when needed:

```powershell
mvn -q dependency:analyze-only
```

Collect candidate dependencies reported as declared but unused.

### Step 3: Perform a deep usage scan for each candidate

For each candidate dependency, inspect the project before making edits.

Required checks:

1. Search Java and Kotlin sources for direct imports and fully qualified class names.
2. Search test sources separately to detect test-only usage.
3. Search resource files and configuration such as `application*.yml`, `application*.properties`, XML, YAML, JSON, `META-INF`, Spring XML, Logback, and plugin configs.
4. Search for reflection and indirect loading patterns such as:
	- `Class.forName`
	- `ServiceLoader`
	- `META-INF/services`
	- framework class-name strings in configuration
5. Check generated-source and annotation-processor scenarios, especially dependencies related to:
	- Lombok
	- MapStruct
	- QueryDSL
	- JAXB / XJC
	- JPA metamodel generation
	- OpenAPI / code generation
6. Check whether the dependency is actually required in one of these special roles:
	- `provided`
	- `runtime`
	- `test`
	- plugin dependency
	- BOM import (`type=pom`, `scope=import`)
	- parent or dependency-management entry
7. Check dependency trees for modules that may rely on the dependency during compilation, tests, packaging, shading, or plugin execution.

If any of the checks above finds credible usage, keep the dependency and record why.

### Step 4: Remove candidates conservatively

Only remove one candidate at a time or one tightly related group at a time.

Do not batch-remove unrelated dependencies before verification.

When editing `pom.xml` files:

1. Preserve formatting and existing dependency ordering when practical.
2. Do not remove dependency-management entries unless they are clearly dead and not managing any child usage.
3. Do not remove BOM imports, parent references, or plugin dependencies unless the deep scan proves they are unnecessary.

### Step 5: Verify after each removal

After each removal, run the cheapest discriminating validation first, then broaden only if it passes.

Recommended verification order:

1. Module-scoped compile:

```powershell
mvn -pl <module> -am -DskipTests compile
```

2. Module-scoped tests:

```powershell
mvn -pl <module> -am test
```

3. Full project verification when the module-level checks pass, or immediately for single-module builds:

```powershell
mvn verify
```

If the project has an established wrapper, prefer `./mvnw` on Unix-like shells or `mvnw.cmd` on Windows.

If a removal breaks compilation, tests, packaging, or plugin execution, restore the dependency and mark it as required.

### Step 6: Finish with a verified summary

Report results in three sections:

1. Removed safely
2. Kept because usage was found
3. Needs manual review

For manual review cases, explain exactly what made the result ambiguous, such as runtime-only loading, environment-specific profiles, or plugin-driven usage that could not be fully exercised.

## Deep-Scan Rules

Treat these as high-risk false-positive categories. Do not remove such dependencies without strong evidence and successful verification:

- Reflection-heavy libraries
- Spring starters and autoconfiguration support libraries
- Serialization libraries used through annotations or runtime registration
- JDBC drivers and runtime connectors
- Logging backends and bridges
- Jakarta / Javax APIs provided by container or runtime
- Annotation processors and code-generation dependencies
- Dependencies used only by integration tests or profile-specific builds
- Dependencies referenced only from generated code or generated resources

## Search Guidance

Prefer fast repo-wide text search first. Use searches that cover both package names and likely class names.

Examples:

```powershell
rg "import com\.example\.lib|com\.example\.lib\." -n .
rg "Class\.forName|ServiceLoader|META-INF/services" -n .
rg "artifact-id|group-id|library-name" -n .
```

Adjust search terms to the actual dependency coordinates and known packages.

## Decision Standard

A dependency may be removed only when all of the following are true:

1. Maven analysis marks it as a candidate or equivalent inspection makes it suspect.
2. Deep scan finds no credible source, test, resource, generated-code, reflection, or plugin usage.
3. The dependency is not serving as a BOM, parent, plugin dependency, dependency-management entry, annotation processor, or runtime-only requirement.
4. The project still compiles.
5. The relevant tests pass.
6. Full verification passes when feasible.

If any of these conditions is not satisfied, keep the dependency or classify it as manual review.

## Safety Rules

- Do not remove multiple unrelated dependencies in a single edit.
- Do not leave the build red after analysis.
- Revert any dependency removal that fails validation.
- Prefer evidence from the current project over assumptions based on common usage.
- If tests are unavailable or cannot run, say so explicitly and lower confidence in the removal decision.

## Output Expectations

At the end, provide:

- The list of dependencies removed from each `pom.xml`.
- The exact Maven commands used for verification.
- Any dependencies restored after failed validation.
- Remaining candidates that still need human review.
- Residual risk if some profiles, integration tests, or environment-specific checks could not be exercised.
