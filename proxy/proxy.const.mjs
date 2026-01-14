// npm run start:proxy

// demo
// http://localhost:4201/nde/home?vid=EXLDEV1_INST:NDE_SPRINSHARE
// https://exldev-test1.primo.exlibrisgroup.com/nde/home?vid=EXLDEV1_INST:NDE_SPRINSHARE
// http://exldev-test1.primo.exlibrisgroup.com/nde/search?query=harry%20potter&tab=LibraryCatalog&search_scope=MyInstitution&searchInFulltext=false&facet=tlevel,include,available_p&offset=20&vid=EXLDEV1_INST:NDE_SPRINSHARE&lang=en
// http://localhost:4201/nde/search?query=harry%20potter&tab=LibraryCatalog&search_scope=MyInstitution&searchInFulltext=false&facet=tlevel,include,available_p&offset=0&vid=EXLDEV1_INST:NDE_SPRINSHARE&lang=en

// bond
// http://localhost:4201/nde/search?query=harry%20potter&tab=Everything&search_scope=Everything&searchInFulltext=true&vid=61BOND_INST:BOND&lang=en
// https://librarysearch.bond.edu.au/nde/search?query=harry%20potter&tab=Everything&search_scope=Everything&searchInFulltext=true&vid=61BOND_INST:BOND&lang=en

// tulane
// http://localhost:4201/nde/search?query=harry%20potter&tab=LibraryCatalog&search_scope=MyInstitution&searchInFulltext=false&facet=tlevel,include,available_p&vid=01TUL_INST:NDE&lang=en
// https://library.search.tulane.edu/nde/search?query=harry%20potter&tab=LibraryCatalog&search_scope=MyInstitution&searchInFulltext=false&facet=tlevel,include,available_p&offset=20&vid=01TUL_INST:NDE&lang=en

const environments = {
    'demo': 'https://exldev-test1.primo.exlibrisgroup.com',
    'bond': 'https://librarysearch.bond.edu.au',
    'tulane': 'https://library.search.tulane.edu',
}

export const PROXY_TARGET = environments['tulane'];
