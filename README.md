About Tessy
===========

Tessy is a test manager written in nodejs.

Features:
=========

    Test-Cases
      * store 
      * categorize
      * reporting 
      * editing
      * execute 
      * set permissions(rwx)

    Execution
      * multi-variate SUTs (systems under test)
      
    Security 
      * user-based with roles  (admin, manager, tester)

    Continous Integration
      * Jenkins API integration (execute jenkins jobs)

    S.U.T loader (load web pages through Tessy to inspect them)
       * Run w3c validation checks
       * take screenshots of pages
       * highlight UI bugs

    Reporting
       * View test-case execution counts ( passes, failures, skips ) 
       * Track which SUTs and devices have higher passes, failures or skips
       * using shutterstock's rickshaw to view all types of graphs for data above
       * compare users/testers bug/executions counts
       * SUT performance measurements
       
    Ticketing system
       * track bugs via tickets
       * reporting
       * priority/severity levels
       * categorization
       * attachments
       * Test-case to ticket mapping
       * Jira/Bugzilla integration
