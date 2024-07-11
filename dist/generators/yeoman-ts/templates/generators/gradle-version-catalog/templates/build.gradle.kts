@Suppress("DSL_SCOPE_VIOLATION")

plugins {
    `version-catalog`
    `maven-publish`
}

group = "<%= project.group %>"
version = "<%= project.version %>"

catalog {
    versionCatalog {
        from(files("libs.versions.toml"))
    }
}

publishing {
    repositories {
        maven {
            url = uri(providers.gradleProperty("maven_contextUrl").get())
            credentials {
                username = providers.gradleProperty("maven_user").get()
                password = providers.gradleProperty("maven_password").get()
            }
        }
    }
    publications {
        create<MavenPublication>("version-catalog") {
            groupId = "$group"
            artifactId = project.name
            version = version
            from(components["versionCatalog"])
        }
    }
}