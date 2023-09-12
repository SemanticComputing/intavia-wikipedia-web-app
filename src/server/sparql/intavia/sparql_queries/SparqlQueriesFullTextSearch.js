export const fullTextSearchProperties = `
  VALUES ?type__id {
    wlink:Person
    wlink:Page
  }
  
  ?id a ?type__id .
  ?type__id rdfs:label ?type__prefLabel . 

  {
    ?id a wlink:Person ;
        rdfs:label ?prefLabel__id .
    BIND(?prefLabel__id as ?prefLabel__prefLabel)
    BIND(CONCAT("/actors/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
  }
  UNION
  {
    ?id a wlink:Page ;
        rdfs:label ?prefLabel__id .
    BIND(?prefLabel__id as ?prefLabel__prefLabel)
    BIND(CONCAT("/references/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
  }
  `
