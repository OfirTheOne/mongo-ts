
# Mongo-TS

### About :
Using decorators located in key positions in a class (represent your mongoose schema, only definitely typed), a 'native' mongoose schema is being build behind the scene, without you repetitively write your schema (once as an interface, class and then a mongoose schema) 

**Using mongo-ts your schema need to be written once as a class - and a typed cover schema will be created for you.**

<br>

### References :
* [MongoDB]('https://docs.mongodb.com/manual/') 
* [Mongoose]('https://mongoosejs.com/docs/guide.html')
* [Typescript]('https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html')

<br>

### Features :

* Generate class definition to a native mongoose schema.
* Support OOP writing style by enabling schema class extending.
* Reduce redundancies by inferring the property type (using reflection).
* Cover created and fetched documents with the schema class definition.
* // Todo : describe class method & static feature.

<br>


### Table Of Content :
+ [Installation](#installation)
+ [Short Intro](#short-tntro)
+ [Usage](#usage)
    + [Setup entrypoint script](#setup-entrypoint-script)
    + [Create BenchmarkerTask ](#create-benchmarkertask )
    + [Create BenchmarkerTasksGroup](#create-benchmarkertasksgroup)
+ [Inside The O-Benchmarker Flow](#inside-the-o-benchmarker-flow)
+ [API Reference](#api-reference)
    + [Schema Class Decorator](#)
    + [Class Members Decorators](#)
    + [Class Method and Static Decorators](#api-reference)
+ [Example Use Cases](#example-use-cases)

