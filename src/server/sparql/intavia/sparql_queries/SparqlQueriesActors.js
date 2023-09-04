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
  ?id wlink:image ?image__id .
    BIND(URI(CONCAT(REPLACE(STR(?image__id), "^https*:", ""), "?width=600")) as ?image__url)
    BIND(STR(?image__id) as ?image__description)
    BIND(STR(?image__id) as ?image__title)
}
`

export const actorProperties = `
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
      ?id skos:altLabel ?altLabel .
    }
    UNION
    {
      ?id a ?type__id .
      ?type__id skos:prefLabel|rdfs:label ?type__prefLabel .
      BIND(?id AS ?type__dataProviderUrl)
    }
    UNION
    {
      ?id mmm-schema:data_provider_url ?source__id .
      BIND(?source__id AS ?source__dataProviderUrl)
      BIND(?source__id AS ?source__prefLabel)
    }
    UNION
    {
      ?id crm:P98i_was_born/crm:P7_took_place_at ?birthPlace__id .
      ?birthPlace__id rdfs:label ?birthPlace__prefLabel .
      BIND(CONCAT("/places/page/", REPLACE(STR(?birthPlace__id), "^.*\\\\/(.+)", "$1")) AS ?birthPlace__dataProviderUrl)
    }
    UNION
    {
      ?id crm:P98i_was_born/crm:P4_has_time-span ?birthDateTimespan__id .
      ?birthDateTimespan__id rdfs:label ?birthDateTimespan__prefLabel .
      OPTIONAL { ?birthDateTimespan__id crm:P82a_begin_of_the_begin ?birthDateTimespan__start }
      OPTIONAL { ?birthDateTimespan__id crm:P82b_end_of_the_end ?birthDateTimespan__end }
    }
    UNION
    {
      ?id crm:P100i_died_in/crm:P4_has_time-span ?deathDateTimespan__id .
      ?deathDateTimespan__id rdfs:label ?deathDateTimespan__prefLabel .
      OPTIONAL { ?deathDateTimespan__id crm:P82a_begin_of_the_begin ?deathDateTimespan__start }
      OPTIONAL { ?deathDateTimespan__id crm:P82b_end_of_the_end ?deathDateTimespan__end }
    }
    UNION
    {
      ?id ^crm:P11_had_participant/crm:P7_took_place_at ?place__id .
      ?place__id rdfs:label ?place__prefLabel .
      BIND(CONCAT("/places/page/", REPLACE(STR(?place__id), "^.*\\\\/(.+)", "$1")) AS ?place__dataProviderUrl)
    }
    UNION
    {
      ?id (^mmm-schema:carried_out_by_as_possible_author
          |^mmm-schema:carried_out_by_as_author
          |^mmm-schema:carried_out_by_as_commissioner
          |^mmm-schema:carried_out_by_as_editor)
          /frbroo:R16_initiated ?work__id .
      ?work__id rdfs:label ?work__prefLabel .
      BIND(CONCAT("/works/page/", REPLACE(STR(?work__id), "^.*\\\\/(.+)", "$1")) AS ?work__dataProviderUrl)
    }
    UNION
    {
      ?id ^crm:P51_has_former_or_current_owner ?manuscript__id .
      ?manuscript__id rdfs:label ?manuscript__prefLabel .
      OPTIONAL {
        ?manuscript__id a frbroo:F4_Manifestation_Singleton .
        BIND(CONCAT("/manuscripts/page/", REPLACE(STR(?manuscript__id), "^.*\\\\/(.+)", "$1")) AS ?manuscript__dataProviderUrl)
      }
      OPTIONAL {
        ?manuscript__id a crm:E78_Collection  .
        BIND(CONCAT("/collections/page/", ENCODE_FOR_URI(REPLACE(STR(?manuscript__id), "^.*\\\\/(.+)", "$1"))) AS ?manuscript__dataProviderUrl)
      }
    }
    UNION
    {
      ?id (^mmm-schema:carried_out_by_as_commissioner
          |^mmm-schema:carried_out_by_as_illuminator
          |^mmm-schema:carried_out_by_as_printer
          |^mmm-schema:carried_out_by_as_scribe)
          /crm:P108_has_produced ?manuscript__id .
      ?manuscript__id rdfs:label ?manuscript__prefLabel .
      BIND(CONCAT("/manuscripts/page/", REPLACE(STR(?manuscript__id), "^.*\\\\/(.+)", "$1")) AS ?manuscript__dataProviderUrl)
    }
    UNION
    {
      ?id (^mmm-schema:carried_out_by_as_possible_author
          |^mmm-schema:carried_out_by_as_author
          |^mmm-schema:carried_out_by_as_commissioner
          |^mmm-schema:carried_out_by_as_editor)
          /frbroo:R16_initiated/^mmm-schema:manuscript_work ?manuscript__id .
      ?manuscript__id rdfs:label ?manuscript__prefLabel .
      BIND(CONCAT("/manuscripts/page/", REPLACE(STR(?manuscript__id), "^.*\\\\/(.+)", "$1")) AS ?manuscript__dataProviderUrl)
    }
    UNION
    {
      ?id (^crm:P11_had_participant
          |^crm:P28_custody_surrendered_by
          |^crm:P29_custody_received_by
          |^mmm-schema:carried_out_by_as_selling_agent)
          /^crm:P30_transferred_custody_of|^mmm-schema:observed_manuscript ?manuscript__id .
      ?manuscript__id rdfs:label ?manuscript__prefLabel .
      OPTIONAL {
        ?manuscript__id a frbroo:F4_Manifestation_Singleton .
        BIND(CONCAT("/manuscripts/page/", REPLACE(STR(?manuscript__id), "^.*\\\\/(.+)", "$1")) AS ?manuscript__dataProviderUrl)
      }
      OPTIONAL {
        ?manuscript__id a crm:E78_Collection  .
        BIND(CONCAT("/collections/page/", ENCODE_FOR_URI(REPLACE(STR(?manuscript__id), "^.*\\\\/(.+)", "$1"))) AS ?manuscript__dataProviderUrl)
      }
    }
    UNION
    {
      ?id ^mmm-schema:carried_out_by_as_author/a frbroo:F27_Work_Conception .
      BIND("Author" as ?role)
    }
    UNION
    {
      ?id ^mmm-schema:carried_out_by_as_possible_author/a frbroo:F27_Work_Conception .
      BIND("Possible author" as ?role)
    }
    UNION
    {
      ?id ^mmm-schema:carried_out_by_as_translator/a frbroo:F27_Work_Conception .
      BIND("Translator" as ?role)
    }
    UNION
    {
      ?id ^mmm-schema:carried_out_by_as_editor/a frbroo:F27_Work_Conception .
      BIND("Editor" as ?role)
    }
    UNION
    {
      ?id ^mmm-schema:carried_out_by_as_commissioner/a frbroo:F27_Work_Conception .
      BIND("Commissioner" as ?role)
    }
    UNION
    {
      ?id ^mmm-schema:carried_out_by_as_recipient/a frbroo:F27_Work_Conception .
      BIND("Recipient" as ?role)
    }
    UNION
    {
      ?id ^mmm-schema:carried_out_by_as_binder/a crm:E12_Production .
      BIND("Binder" as ?role)
    }
    UNION
    {
      ?id ^mmm-schema:carried_out_by_as_commissioner/a crm:E12_Production .
      BIND("Commissioner" as ?role)
    }
    UNION
    {
      ?id ^mmm-schema:carried_out_by_as_creator/a crm:E12_Production .
      BIND("Creator" as ?role)
    }
    UNION
    {
      ?id ^mmm-schema:carried_out_by_as_illuminator/a crm:E12_Production .
      BIND("Illuminator" as ?role)
    }
    UNION
    {
      ?id ^mmm-schema:carried_out_by_as_printer/a crm:E12_Production .
      BIND("Printer" as ?role)
    }
    UNION
    {
      ?id ^mmm-schema:carried_out_by_as_scribe/a crm:E12_Production .
      BIND("Scribe" as ?role)
    }
    UNION
    {
      ?id ^mmm-schema:carried_out_by_as_artist/a crm:E12_Production .
      BIND("Artist" as ?role)
    }
    UNION
    {
      ?id ^mmm-schema:carried_out_by_as_patron/a crm:E12_Production .
      BIND("Patron" as ?role)
    }
    UNION
    {
      ?id ^mmm-schema:carried_out_by_as_signer/a crm:E12_Production .
      BIND("Signer" as ?role)
    }
    UNION
    {
      ?id ^mmm-schema:carried_out_by_as_dedicatee/a crm:E12_Production .
      BIND("Dedicatee" as ?role)
    }
    UNION
    {
      ?id ^crm:P51_has_former_or_current_owner/a frbroo:F4_Manifestation_Singleton  .
      BIND("Manuscript owner" as ?role)
    }
    UNION
    {
      ?id ^crm:P51_has_former_or_current_owner/a crm:E78_Collection  .
      BIND("Collection owner" as ?role)
    }
    UNION
    {
      ?id ^mmm-schema:carried_out_by_as_selling_agent [] .
      BIND("Selling agent" as ?role)
    }

`

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
