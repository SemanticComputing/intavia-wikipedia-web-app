export const actorPropertiesFacetResults = `
{
  ?id rdfs:label ?prefLabel__id .
  BIND(?prefLabel__id AS ?prefLabel__prefLabel)
  BIND(CONCAT("/actors/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__dataProviderUrl)
  BIND(?id as ?uri__prefLabel)
}
UNION
{
  ?id wlink:dataset/rdfs:label ?dataset .
}
UNION
{
  ?id wlink:has_reference ?link__id .
  ?link__id rdfs:label ?link__prefLabel ; wlink:references ?reference__id .
  BIND(CONCAT("/sentences/page/", REPLACE(STR(?link__id), "^.*\\\\/(.+)", "$1")) AS ?link__dataProviderUrl)

  ?reference__id rdfs:label ?reference__prefLabel .
  BIND(CONCAT("/references/page/", REPLACE(STR(?reference__id), "^.*\\\\/(.+)", "$1")) AS ?reference__dataProviderUrl)

}
UNION
{
  ?id wlink:birth_date/rdfs:label ?birth_date
}
UNION
{
  ?id wlink:death_date/rdfs:label ?death_date
}
UNION
{
  ?id wlink:birth_place ?birth_place__id .
  ?birth_place__id rdfs:label ?birth_place__prefLabel .
  BIND(CONCAT("/references/page/", REPLACE(STR(?birth_place__id), "^.*\\\\/(.+)", "$1")) AS ?birth_place__dataProviderUrl)
}
UNION
{
  ?id wlink:death_place ?death_place__id .
  ?death_place__id rdfs:label ?death_place__prefLabel .
  BIND(CONCAT("/references/page/", REPLACE(STR(?death_place__id), "^.*\\\\/(.+)", "$1")) AS ?death_place__dataProviderUrl)
}
UNION
{
  ?id wlink:image ?image__id .
    BIND(URI(CONCAT(REPLACE(STR(?image__id), "^https*:", ""), "?width=600")) as ?image__url)
    BIND(STR(?image__id) as ?image__description)
    BIND(STR(?image__id) as ?image__title)
}
`

export const actorProperties = `
    {
      ?id rdfs:label ?prefLabel__id .
      BIND (?prefLabel__id AS ?prefLabel__prefLabel)
      BIND (CONCAT("/actors/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
      BIND (?id as ?uri__id)
      BIND (?id as ?uri__dataProviderUrl)
      BIND (?id as ?uri__prefLabel)
    }
    UNION
    {
      ?id a ?type__id .
      ?type__id skos:prefLabel|rdfs:label ?type__prefLabel .
      BIND (?id AS ?type__dataProviderUrl)
    }
    UNION
    {
      ?id wlink:dataset/rdfs:label ?dataset 
    }
    UNION  
    {
      { SELECT DISTINCT ?id ?link__id 
        WHERE {
            ?id wlink:has_reference ?link__id .
            ?link__id wlink:order ?_sort_by .
        } ORDER BY ?_sort_by 
        }
        ?link__id rdfs:label ?link__prefLabel .
        BIND (CONCAT("/sentences/page/", REPLACE(STR(?link__id), "^.*\\\\/(.+)", "$1")) AS ?link__dataProviderUrl) 
    }    
    UNION
    {
      ?id wlink:has_reference/wlink:references ?reference__id .
      {
        FILTER EXISTS { ?reference__id a wlink:Person }
        ?reference__id rdfs:label ?reference__prefLabel .
        BIND(CONCAT("/actors/page/", REPLACE(STR(?reference__id), "^.*\\\\/(.+)", "$1")) AS ?reference__dataProviderUrl)
      }
      UNION
      {
        FILTER NOT EXISTS { ?reference__id a wlink:Person }
        ?reference__id rdfs:label ?reference__prefLabel .
        BIND(CONCAT("/references/page/", REPLACE(STR(?reference__id), "^.*\\\\/(.+)", "$1")) AS ?reference__dataProviderUrl)
      }
    }  
    UNION
    {
      ?id wlink:has_reference/wlink:html ?link_html_UNUSED }
    UNION
    {
      ?id wlink:birth_date/rdfs:label ?birth_date
    }
    UNION
    {
      ?id wlink:death_date/rdfs:label ?death_date
    }
    UNION
    {
      ?id wlink:birth_place ?birth_place__id .
      ?birth_place__id rdfs:label ?birth_place__prefLabel .
      BIND(CONCAT("/references/page/", REPLACE(STR(?birth_place__id), "^.*\\\\/(.+)", "$1")) AS ?birth_place__dataProviderUrl)
    }
    UNION
    {
      ?id wlink:death_place ?death_place__id .
      ?death_place__id rdfs:label ?death_place__prefLabel .
      BIND(CONCAT("/references/page/", REPLACE(STR(?death_place__id), "^.*\\\\/(.+)", "$1")) AS ?death_place__dataProviderUrl)
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
      ?id owl:sameAs ?external__id .
      BIND (STR(?external__id) AS ?external__prefLabel)
      BIND (URI(?external__id) AS ?external__dataProviderUrl)
    }
`

// UNUSED!
export const actorPlacesQuery = `
  SELECT ?id ?lat ?long
  (COUNT(DISTINCT ?actor) as ?instanceCount)
  WHERE {
    <FILTER>
    { ?actor crm:P98i_was_born/crm:P7_took_place_at ?id }
    UNION
    { ?actor crm:P100i_died_in/crm:P7_took_place_at ?id }
    UNION
    { ?actor ^crm:P11_had_participant/crm:P7_took_place_at ?id }
    ?id wgs84:lat ?lat ;
        wgs84:long ?long .
  }
  GROUP BY ?id ?lat ?long
`

export const peopleMigrationsQuery = `
SELECT DISTINCT ?id 
  ?from__id ?from__prefLabel ?from__lat ?from__long ?from__dataProviderUrl
  ?to__id ?to__prefLabel ?to__lat ?to__long ?to__dataProviderUrl
  (COUNT(DISTINCT ?person) as ?instanceCount)

WHERE {
    
    <FILTER>
    
    ?person a wlink:Person ;
      wlink:birth_place ?from__id ;
      wlink:death_place ?to__id .
    
  	FILTER(?from__id != ?to__id)
  
    ?from__id rdfs:label ?from__prefLabel ;
    	wlink:coordinate [ wlink:lat ?from__lat ; wlink:long ?from__long ] .
      BIND(CONCAT("/references/page/", REPLACE(STR(?from__id), "^.*\\\\/(.+)", "$1")) AS ?from__dataProviderUrl)
    
    ?to__id rdfs:label ?to__prefLabel ;
    	wlink:coordinate [ wlink:lat ?to__lat ; wlink:long ?to__long ] .
      BIND(CONCAT("/references/page/", REPLACE(STR(?to__id), "^.*\\\\/(.+)", "$1")) AS ?to__dataProviderUrl)  
    
    BIND(IRI(CONCAT(STR(?from__id), "-", REPLACE(STR(?to__id), "http://www.wikidata.org/entity/", ""))) as ?id)
  } GROUP BY 
    ?id 
    ?from__id ?from__prefLabel ?from__lat ?from__long ?from__dataProviderUrl
    ?to__id ?to__prefLabel ?to__lat ?to__long ?to__dataProviderUrl
  ORDER BY desc(?instanceCount)
`

export const peopleMigrationsDialogQuery = `
  SELECT * {
    <FILTER>
    ?id a wlink:Person ;
      wlink:birth_place <FROM_ID> ;
      wlink:death_place <TO_ID> ;
      rdfs:label ?prefLabel .
    BIND(CONCAT("/actors/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?dataProviderUrl)
  }
`

//  marker map and heatmap
export const peoplePlacesQuery = `
SELECT DISTINCT ?id ?lat ?long 
  (COUNT(DISTINCT ?person) AS ?instanceCount)
  WHERE {
    
    <FILTER>
    
    ?person wlink:has_reference/wlink:references ?id .
      
    ?id wlink:coordinate [ wlink:lat ?lat ;
      wlink:long ?long ]
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
export const peopleRelatedTo = `
  OPTIONAL {
    <FILTER>
    ?related__id wlink:has_reference/wlink:references ?id ; rdfs:label ?related__prefLabel .
    BIND(CONCAT("/actors/page/", REPLACE(STR(?related__id), "^.*\\\\/(.+)", "$1")) AS ?related__dataProviderUrl)
  }
`

// Time series
export const lifeYearsQuery = `
  SELECT DISTINCT ?category 
  (COUNT(?birth) AS ?birthCount) 
  (COUNT(?death) AS ?deathCount) 
  WHERE {
    <FILTER>
    { 
      ?person wlink:birth_date/crm:P82a_begin_of_the_begin ?birth .
      BIND (year(?birth) AS ?category)
    } 
    UNION 
    {
      ?person wlink:death_date/crm:P82a_begin_of_the_begin ?death .
      BIND (year(?death) AS ?category)
    }
  } 
  GROUP BY ?category 
  ORDER BY ?category
`

// on actor instance page
export const networkLinkQuery = `
SELECT DISTINCT ?source ?target 
  (COUNT(DISTINCT ?link) AS ?weight) 
	(STR(?weight) AS ?prefLabel) 
WHERE {
  VALUES ?source { <ID> }
  ?source a wlink:Person ; wlink:has_reference/wlink:references ?link .
  ?link ^(wlink:has_reference/wlink:references) ?target .
  FILTER (?target != ?source)
} GROUPBY ?source ?target
`

// on actor instance apge
export const networkNodeQuery = `
  SELECT DISTINCT ?id ?prefLabel ?class ?href 
    (COALESCE(?_out, 0)+COALESCE(?_in, 0) AS ?numLetters)
  WHERE {
    VALUES ?id { <ID_SET> }
    ?id a ?class ;
      rdfs:label ?_label .

    BIND(REPLACE(?_label, ',[^,A-ZÜÅÄÖ]+$', '')AS ?prefLabel)
    BIND(CONCAT("../../page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1"),"/network") AS ?href)
  }
`

