export const sentencePropertiesFacetResults = `
  ?id rdfs:label ?prefLabel__id .
  BIND(?prefLabel__id AS ?prefLabel__prefLabel)
  BIND(CONCAT("/sentences/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)

  { 
    ?id wlink:references ?reference__id .
    ?reference__id rdfs:label ?reference__prefLabel .
    BIND(CONCAT("/references/page/", REPLACE(STR(?reference__id), "^.*\\\\/(.+)", "$1")) AS ?reference__dataProviderUrl)
  }
  UNION
  {
    ?person__id wlink:has_reference ?id ; rdfs:label ?person__prefLabel .
    BIND(CONCAT("/actors/page/", REPLACE(STR(?person__id), "^.*\\\\/(.+)", "$1")) AS ?person__dataProviderUrl)
    OPTIONAL { ?person__id wlink:dataset/rdfs:label ?dataset }
  }
  UNION 
  {	
    ?id dcterms:source ?source__id .
    BIND(?source__id AS ?source__prefLabel) 
    BIND(?source__id AS ?source__dataProviderUrl) 
  }
`

export const sentenceProperties = `
    {
      ?id rdfs:label ?prefLabel__id .
      BIND(?prefLabel__id AS ?prefLabel__prefLabel)
      BIND(CONCAT("/sentences/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
      BIND(?id as ?uri__id)
      BIND(?id as ?uri__dataProviderUrl)
      BIND(?id as ?uri__prefLabel)
    }
    UNION
    { 
      ?id wlink:references ?reference__id .
      ?reference__id rdfs:label ?reference__prefLabel .
      BIND(CONCAT("/references/page/", REPLACE(STR(?reference__id), "^.*\\\\/(.+)", "$1")) AS ?reference__dataProviderUrl)
    }
    UNION
    {
      ?person__id wlink:has_reference ?id ; rdfs:label ?person__prefLabel .
      BIND(CONCAT("/actors/page/", REPLACE(STR(?person__id), "^.*\\\\/(.+)", "$1")) AS ?person__dataProviderUrl)
      OPTIONAL { ?person__id wlink:dataset/rdfs:label ?dataset }
    }
    UNION 
    {	
      ?id dcterms:source ?source__id .
      BIND(?source__id AS ?source__prefLabel) 
      BIND(?source__id AS ?source__dataProviderUrl) 
    }
    UNION
    {
      ?id wlink:section ?section 
    }
    UNION
    {
      ?id wlink:html ?html
    }

`
