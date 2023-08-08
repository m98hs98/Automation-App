Automation App README

Introduction

Welcome to the Automation App! This React application helps users search and rank various URLs based on specific domain keywords.

Features

Filtered Searches: Avoid common and unwanted URLs using our preset filter. For example, results from domains like 'googleusercontent.com' and 'google.com.au' are filtered out.
Search for a Specific Domain: Enter the domain you want to search for without prefixes such as 'https://' or 'www.'.
Specify Number of Results: Choose how many results you'd like to inquire about.
Visual Ranking: View the rank of your domain amidst the search results.

How to Use

Setting Desired Result Count:
Look for the section titled "Results count that you want to enquire".
Use the input box to enter a number between 10 and 50. This number indicates how many search results you wish to look into.
Entering Keywords:
Navigate to the "Keywords" section.
Use the provided input box to type any keyword you want to search for. 
Inputting Your Domain:
Jump to the "Your website" section.
Enter your domain name in the input box. Remember, you don't need 'https://' or 'www.'.
If your domain is invalid, you'll see a helpful error message in red.
Initiate the Search:
Once you've filled out your desired result count and domain, click the "Search" button.
You'll then see a list of search results, showing how your domain ranks amidst them.

Under the Hood

This application uses the React framework.
We maintain a list of filtered strings to keep out undesired search results.
The app uses regular expressions to validate and extract URLs.
Search results are fetched from Google/Page0X.html (where X is the page number) and processed to derive meaningful rankings.
User inputs are managed using React's useState hooks.
Search results fetching is managed using React's useEffect hook.

Code Comments

In the provided code, you'll find comments that help explain specific blocks of logic. For example:

There's a commented-out block showing the "Found URLs for page X" feature, which seems to be in development or for debug purposes. Uncommenting it would display the raw results from the search.

Wrapping Up

The Automation App offers an intuitive interface and a backend that effectively filters and ranks search results. Whether you're looking to see how your website ranks or just curious about the domains that show up for a specific keyword, this tool can help. 

Happy searching!# Automation-App
