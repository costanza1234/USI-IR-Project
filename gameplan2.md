# Detailed Information Retrieval Project Instructions

## Person 1: Frontend & UI Implementation
### Week 1 (Until Nov 27)
1. **Initial Design Research (2 days)**
   - Research modern search interfaces (Google, Bing, specialized search engines)
   - Document key UI patterns for search interfaces
   - List required components (search box, results display, filters)

2. **UI Mockup Creation (2 days)**
   ```
   Use Figma/Adobe XD to create:
   - Main search page mockup
   - Search results page mockup
   - Mobile responsive versions
   ```

3. **Technology Selection (1 day)**
   - Select frontend framework (recommended: React)
   - Choose UI component library
   - Plan state management approach

4. **Progress Report Writing (1 day)**
   - Document design decisions
   - Include mockup screenshots
   - Explain technology choices

### Week 2-3 (Nov 28 - Dec 15)
1. **Basic Structure (3 days)**
   ```
   - Set up project with chosen framework
   - Create component structure
   - Implement basic routing
   ```

2. **Search Interface (4 days)**
   ```
   - Create search box component
   - Implement auto-complete UI
   - Add spell-check suggestions display
   - Style search results container
   ```

3. **Results Display (3 days)**
   ```
   - Create result card component
   - Implement snippet display
   - Add highlighting for matched terms
   - Create pagination/infinite scroll
   ```

4. **Additional Features (4 days)**
   ```
   - Implement filter components
   - Add user feedback buttons
   - Create search statistics display
   - Add loading states and error handling
   ```

5. **Integration & Testing (3 days)**
   ```
   - Connect with API endpoints
   - Implement data fetching
   - Add error handling
   - Test responsive design
   ```

### Final Documentation (Dec 16)
1. Create comprehensive documentation including:
   - Setup instructions
   - Component hierarchy
   - Design system documentation
   - Screenshots of final implementation
   - User interaction flows

## Person 2: Data Collection & Processing
### Week 1 (Until Nov 27)
1. **Website Analysis (2 days)**
   ```
   - Identify 5-10 suitable websites for crawling
   - Analyze website structures
   - Document URL patterns
   - Check robots.txt files
   ```

2. **Crawler Design (2 days)**
   ```
   - Select crawling library (Scrapy recommended)
   - Design data extraction patterns
   - Plan crawling strategy
   - Define data storage schema
   ```

3. **Initial Setup (1 day)**
   ```
   - Set up development environment
   - Install required libraries
   - Create initial project structure
   ```

4. **Progress Report Writing (1 day)**
   - Document selected websites
   - Explain crawler design
   - Outline storage approach

### Week 2-3 (Nov 28 - Dec 15)
1. **Crawler Implementation (4 days)**
   ```
   - Implement basic crawler
   - Add URL filtering
   - Implement rate limiting
   - Add error handling
   ```

2. **Data Storage (3 days)**
   ```
   - Set up database (MongoDB recommended)
   - Implement data storage pipeline
   - Add deduplication logic
   - Create backup strategy
   ```

3. **Data Processing (4 days)**
   ```
   - Implement text extraction
   - Add HTML cleaning
   - Create tokenization pipeline
   - Implement metadata extraction
   ```

4. **Data Quality & Optimization (3 days)**
   ```
   - Add data validation
   - Implement error logging
   - Optimize storage
   - Create data update mechanism
   ```

### Final Documentation (Dec 16)
1. Create technical documentation including:
   - Crawler architecture
   - Data schema
   - Processing pipeline
   - Dataset statistics

## Person 3: Search Engine & Core Features
### Week 1 (Until Nov 27)
1. **Architecture Planning (2 days)**
   ```
   - Choose search engine (Solr/Elasticsearch)
   - Design system architecture
   - Plan API structure
   - Define ranking approach
   ```

2. **Feature Planning (2 days)**
   ```
   - Design query processing pipeline
   - Plan ranking algorithms
   - Design feedback integration
   - Plan snippet generation
   ```

3. **Initial Setup (1 day)**
   ```
   - Set up search engine
   - Create basic index structure
   - Plan API endpoints
   ```

4. **Progress Report Writing (1 day)**
   - Document architecture decisions
   - Explain feature plans
   - Outline implementation strategy

### Week 2-3 (Nov 28 - Dec 15)
1. **Core Search Implementation (4 days)**
   ```
   - Set up search index
   - Implement basic search
   - Add ranking algorithms
   - Create query processing
   ```

2. **API Development (3 days)**
   ```
   - Create REST API
   - Implement search endpoints
   - Add filtering endpoints
   - Create feedback endpoints
   ```

3. **Feature Implementation (4 days)**
   ```
   - Add snippet generation
   - Implement spell-checking
   - Add auto-complete
   - Create feedback processing
   ```

4. **Integration & Optimization (3 days)**
   ```
   - Optimize search performance
   - Add caching
   - Implement monitoring
   - Fine-tune ranking
   ```

### Final Documentation (Dec 16)
1. Create technical documentation including:
   - System architecture
   - API documentation
   - Search algorithms
   - Performance metrics

## Integration Schedule
### Week 2
- Person 1 ↔ Person 3: API contract definition
- Person 2 ↔ Person 3: Data schema finalization

### Week 3
- Person 1 ↔ Person 3: Frontend-API integration
- Person 2 ↔ Person 3: Data pipeline integration

### Final Week
- All: System integration testing
- All: Performance optimization
- All: Documentation review