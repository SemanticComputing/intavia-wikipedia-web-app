export const sentenceProperties = `
    {
      ?id rdfs:label ?prefLabel__id .
      BIND(?prefLabel__id AS ?prefLabel__prefLabel)
      BIND(CONCAT("/references/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
      BIND(?id as ?uri__id)
      BIND(?id as ?uri__dataProviderUrl)
      BIND(?id as ?uri__prefLabel)
    }
    UNION
    {
      ?id skos:altLabel ?altLabel .
    }
    UNION
    {
      ?id a ?type__id .
      ?type__id skos:prefLabel|rdfs:label ?type__prefLabel .
      BIND(?id AS ?type__dataProviderUrl)
    }
    UNION 
    {			?referencer__id  wlink:has_reference/wlink:references ?id ;
              rdfs:label ?referencer__prefLabel .
          BIND(CONCAT("/actors/page/", REPLACE(STR(?referencer__prefLabel), "^.*\\\\/(.+)", "$1")) AS ?referencer__dataProviderUrl) 
    }
    UNION
    {
      ?id wlink:birth_date/rdfs:label ?birth_date
    }
    UNION
    {
      ?id wlink:birth_place/rdfs:label ?birth_place
    }
    UNION
    {
      ?id wlink:death_date/rdfs:label ?death_date
    }
    UNION
    {
      ?id wlink:death_place/rdfs:label ?death_place
    }
`
