rootProject.name = "<%= project.name %>"

//enableFeaturePreview("VERSION_CATALOGS")

@Suppress("UnstableApiUsage")
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        maven {
            url = uri(providers.gradleProperty("maven_contextUrl").get())
            credentials {
                username = providers.gradleProperty("maven_user").get()
                password = providers.gradleProperty("maven_password").get()
            }

        }
        mavenCentral()
    }
    versionCatalogs {
        create("libs") {
            from("<%= project.group %>:<%= project.gvcName %>:<%= project.version %>")
        }
    }
}