export const referencePropertiesFacetResults = `
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

      ?referencer__id wlink:dataset/rdfs:label ?dataset 
}
UNION
{
  ?id wlink:country ?country__id .
  FILTER (?country__id != ?id)
  ?country__id rdfs:label ?country__prefLabel .
  BIND(CONCAT("/references/page/", REPLACE(STR(?country__id), "^.*\\\\/(.+)", "$1")) AS ?country__dataProviderUrl) 
}
UNION
{
  ?id owl:sameAs ?external__id .
  BIND (STR(?external__id) AS ?external__prefLabel)
  BIND (URI(?external__id) AS ?external__dataProviderUrl)
}
`

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
      ?id wlink:birth_place ?birth_place__id .
      ?birth_place__id rdfs:label ?birth_place__prefLabel .
      BIND(CONCAT("/references/page/", REPLACE(STR(?birth_place__id), "^.*\\\\/(.+)", "$1")) AS ?birth_place__dataProviderUrl)
    }
    UNION
    {
      ?id wlink:death_date/rdfs:label ?death_date
    }
    UNION
    {
      ?id wlink:death_place ?death_place__id .
      ?death_place__id rdfs:label ?death_place__prefLabel .
      BIND(CONCAT("/references/page/", REPLACE(STR(?death_place__id), "^.*\\\\/(.+)", "$1")) AS ?death_place__dataProviderUrl)
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
      FILTER (?country__id != ?id)
      ?country__id rdfs:label ?country__prefLabel .
      BIND(CONCAT("/references/page/", REPLACE(STR(?country__id), "^.*\\\\/(.+)", "$1")) AS ?country__dataProviderUrl) 
    }
    UNION
    {
      ?id owl:sameAs ?external__id .
      BIND (STR(?external__id) AS ?external__prefLabel)
      BIND (URI(?external__id) AS ?external__dataProviderUrl)
    }
`

export const referencePlacesQuery = `
SELECT DISTINCT ?id ?lat ?long 
  (COUNT(DISTINCT ?person) AS ?instanceCount)
  WHERE {
    
    <FILTER>
    
    ?person wlink:has_reference/wlink:references ?id .
    
    ?id wlink:lat ?lat ;
      wlink:long ?long .
  } GROUP BY ?id ?lat ?long
`

//  map popup
export const placePropertiesInfoWindow = `
  OPTIONAL { ?id rdfs:label ?_label }
  BIND(COALESCE(?_label, "<place>") AS ?prefLabel__id)
  BIND(?prefLabel__id AS ?prefLabel__prefLabel)
  BIND(CONCAT("/references/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
`

//  references shown in map popup
export const actorsRelatedTo = `
  
    ?related__id wlink:has_reference/wlink:references ?id ; rdfs:label ?related__prefLabel .
    BIND(CONCAT("/actors/page/", REPLACE(STR(?related__id), "^.*\\\\/(.+)", "$1")) AS ?related__dataProviderUrl)
  
`