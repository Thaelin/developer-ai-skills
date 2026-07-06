---
name: upgrade-spring-boot-3-to-4
description: This skill provides upgrade from SpringBoot 3 to SpringBoot 4, including detailed instructions and examples for a smooth transition.
---

This is a major upgrade so thorough reasoning is required. You can reference the migration guide from this source: https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-4.0-Migration-Guide .

To check what latest SpringBoot 4 version is available, you can visit this site https://mvnrepository.com/artifact/org.springframework.boot/spring-boot .

Make required changes in your `pom.xml` file to update the SpringBoot version to the latest 4.x.x version and also update any other dependencies that are affected by this upgrade. If there are any changes in the libraries APIs, make sure to refactor the client code inside the codebase according to the relevant documentation.

After making the necessary changes, run your application and perform thorough testing to ensure that everything is functioning as expected. Pay special attention to any deprecated features or breaking changes that may have been introduced in SpringBoot 4.

You can run build to ensure that everything compiles fine and tests pass via `mvn clean install` command. If there are any issues, refer to the migration guide and relevant documentation to resolve them.
