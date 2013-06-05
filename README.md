SPAcify
=======

ASP.NET MVC TypeScript SPA starter kit inspired by the HotTowel SPA Template.

## NuGet Package ##
This template is also available in nuget form:

	Install-Package SPAcify

https://nuget.org/packages/SPAcify/

## Features ##

- Uses Durandaljs for application structure and MVVM,
- Typescript for viewmodel implementation,
- T4 to generate typescript model from code first server side model (Entity Framework),
- Breezejs for data querying and persistence (starter code comming soon).

## Notes ##

A core Durandal file (viewModelBinder.js) was modified to allow a better integration with typescript.
This change is temporary until there's a better support for typescript in Durandal (eagerly waiting for V2).
