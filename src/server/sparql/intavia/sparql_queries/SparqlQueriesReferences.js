export const referenceProperties = `
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
      ?id wlink:image ?image__id .
      BIND(URI(CONCAT(REPLACE(STR(?image__id), "^https*:", ""), "?width=600")) as ?image__url)
      BIND(STR(?image__id) as ?image__description)
      BIND(STR(?image__id) as ?image__title)
    }
    UNION
    {
      ?id skos:altLabel ?altLabel
    }
    UNION
    {
      ?id wlink:type/rdfs:label ?type
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
          BIND(CONCAT("/actors/page/", REPLACE(STR(?referencer__id), "^.*\\\\/(.+)", "$1")) AS ?referencer__dataProviderUrl) 
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
    UNION
    { 
      ?id wlink:occupation/rdfs:label ?occupation
    }
    UNION
    { 
      ?id wlink:lat ?lat ; wlink:long ?long .
        BIND (CONCAT('lat ', STR(xsd:decimal(?lat)), ', long ',STR(xsd:decimal(?long))) as ?coordinate)
    }
    UNION
    {
      ?id wlink:country ?country__id .
      ?country__id rdfs:label ?country__prefLabel .
      BIND(CONCAT("/references/page/", REPLACE(STR(?country__id), "^.*\\\\/(.+)", "$1")) AS ?country__dataProviderUrl) 
    }
`
