<!DOCTYPE html>
<?php require_once 'php/check_auth.php'; ?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seller's Guide - Sell Your Car Like a Pro | QRCarShop</title>
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/seller-guide.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <div class="header-content">
                <div class="logo">
                    <a href="index.html">
                        <img src="img/logo.png" alt="QRCarShop" class="logo-img">
                    </a>
                </div>
                <nav class="header-nav">
                    <a href="index.html">Home</a>
                    <a href="dashboard.html">Dashboard</a>
                    <a href="seller-guide.html" class="active">Seller Guide</a>
                </nav>
                <button class="auth-btn" onclick="location.href='auth.html'">
                    <i class="fas fa-user"></i>
                    <span>Log in / Sign up</span>
                </button>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="guide-hero">
        <div class="container">
            <div class="hero-content">
                <h1>Sell Your Car Like a Pro</h1>
                <p class="hero-subtitle">Master the art of creating compelling listings that sell faster and for more money</p>
                <div class="hero-stats">
                    <div class="stat">
                        <span class="stat-number">3x</span>
                        <span class="stat-label">Faster Sales</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">15%</span>
                        <span class="stat-label">Higher Price</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">50+</span>
                        <span class="stat-label">Pro Tips</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Guide Navigation -->
    <section class="guide-nav">
        <div class="container">
            <div class="nav-tabs">
                <button class="nav-tab active" data-section="photos">
                    <i class="fas fa-camera"></i>
                    Take Better Photos
                </button>
                <button class="nav-tab" data-section="descriptions">
                    <i class="fas fa-pen"></i>
                    Better Descriptions
                </button>
                <button class="nav-tab" data-section="market">
                    <i class="fas fa-chart-line"></i>
                    Know Your Market
                </button>
                <button class="nav-tab" data-section="condition">
                    <i class="fas fa-search"></i>
                    Vehicle Condition
                </button>
            </div>
        </div>
    </section>

    <!-- Photo Guide Section -->
    <section class="guide-section active" id="photos-section">
        <div class="container">
            <div class="section-header">
                <h2><i class="fas fa-camera"></i> Take Better Photos</h2>
                <p>Great photos can increase your chances of selling by 300%. Here's how to take them.</p>
            </div>

            <div class="guide-grid">
                <div class="guide-card">
                    <div class="card-header">
                        <i class="fas fa-sun text-warning"></i>
                        <h3>Lighting is Everything</h3>
                    </div>
                    <div class="do-dont">
                        <div class="do">
                            <h4><i class="fas fa-check-circle text-success"></i> DO</h4>
                            <ul>
                                <li>Shoot during "golden hour" (1 hour after sunrise or before sunset)</li>
                                <li>Use overcast days for even, soft lighting</li>
                                <li>Take interior photos with all lights on</li>
                                <li>Avoid direct sunlight that creates harsh shadows</li>
                            </ul>
                        </div>
                        <div class="dont">
                            <h4><i class="fas fa-times-circle text-danger"></i> DON'T</h4>
                            <ul>
                                <li>Shoot in bright midday sun</li>
                                <li>Take photos at night with flash</li>
                                <li>Shoot in dark garages or parking structures</li>
                                <li>Use indoor fluorescent lighting</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="guide-card">
                    <div class="card-header">
                        <i class="fas fa-eye text-info"></i>
                        <h3>Essential Photo Angles</h3>
                    </div>
                    <div class="photo-checklist">
                        <div class="checklist-item">
                            <i class="fas fa-check"></i>
                            <span><strong>Front 3/4 angle</strong> - Show the front and side together</span>
                        </div>
                        <div class="checklist-item">
                            <i class="fas fa-check"></i>
                            <span><strong>Rear 3/4 angle</strong> - Opposite corner view</span>
                        </div>
                        <div class="checklist-item">
                            <i class="fas fa-check"></i>
                            <span><strong>Straight-on front</strong> - Center the vehicle</span>
                        </div>
                        <div class="checklist-item">
                            <i class="fas fa-check"></i>
                            <span><strong>Straight-on rear</strong> - Show taillights and bumper</span>
                        </div>
                        <div class="checklist-item">
                            <i class="fas fa-check"></i>
                            <span><strong>Both side profiles</strong> - Door to door views</span>
                        </div>
                        <div class="checklist-item">
                            <i class="fas fa-check"></i>
                            <span><strong>Interior dashboard</strong> - From driver's seat</span>
                        </div>
                        <div class="checklist-item">
                            <i class="fas fa-check"></i>
                            <span><strong>Interior seats</strong> - Front and rear</span>
                        </div>
                        <div class="checklist-item">
                            <i class="fas fa-check"></i>
                            <span><strong>Engine bay</strong> - Clean and well-lit</span>
                        </div>
                        <div class="checklist-item">
                            <i class="fas fa-check"></i>
                            <span><strong>Trunk/cargo area</strong> - Show storage space</span>
                        </div>
                        <div class="checklist-item">
                            <i class="fas fa-check"></i>
                            <span><strong>Close-ups of any damage</strong> - Be transparent</span>
                        </div>
                    </div>
                </div>

                <div class="guide-card">
                    <div class="card-header">
                        <i class="fas fa-magic text-purple"></i>
                        <h3>Pro Photography Tips</h3>
                    </div>
                    <div class="tips-list">
                        <div class="tip">
                            <i class="fas fa-sparkles"></i>
                            <div>
                                <h4>Clean Before You Shoot</h4>
                                <p>Wash, vacuum, and detail your car. Remove personal items and clutter.</p>
                            </div>
                        </div>
                        <div class="tip">
                            <i class="fas fa-mobile-alt"></i>
                            <div>
                                <h4>Use Your Phone's Grid</h4>
                                <p>Enable grid lines for better composition and straight horizons.</p>
                            </div>
                        </div>
                        <div class="tip">
                            <i class="fas fa-arrows-alt"></i>
                            <div>
                                <h4>Fill the Frame</h4>
                                <p>Get close enough that the car fills most of the photo.</p>
                            </div>
                        </div>
                        <div class="tip">
                            <i class="fas fa-palette"></i>
                            <div>
                                <h4>Choose Your Background</h4>
                                <p>Use neutral backgrounds - avoid busy or distracting elements.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Descriptions Section -->
    <section class="guide-section" id="descriptions-section">
        <div class="container">
            <div class="section-header">
                <h2><i class="fas fa-pen"></i> Better Descriptions: The Do's and Don'ts</h2>
                <p>Your description can make or break a sale. Here's how to write compelling, honest descriptions.</p>
            </div>

            <div class="guide-grid">
                <div class="guide-card full-width">
                    <div class="card-header">
                        <i class="fas fa-list-alt text-primary"></i>
                        <h3>Description Template That Works</h3>
                    </div>
                    <div class="template-structure">
                        <div class="template-section">
                            <h4>1. Hook (First Line)</h4>
                            <div class="example good">
                                <strong>Good:</strong> "Meticulously maintained 2019 Honda Accord with only 32,000 highway miles!"
                            </div>
                            <div class="example bad">
                                <strong>Bad:</strong> "Selling my car."
                            </div>
                        </div>
                        <div class="template-section">
                            <h4>2. Key Selling Points (Bullet Format)</h4>
                            <div class="example good">
                                <strong>Good:</strong>
                                <ul>
                                    <li>• Single owner, non-smoker</li>
                                    <li>• Full service history available</li>
                                    <li>• New tires (under 5,000 miles)</li>
                                    <li>• Excellent fuel economy (32 city/42 hwy)</li>
                                </ul>
                            </div>
                        </div>
                        <div class="template-section">
                            <h4>3. Condition & Maintenance</h4>
                            <div class="example good">
                                <strong>Good:</strong> "Recently serviced with oil change, brake inspection, and new air filter. Minor door ding on passenger side (shown in photos). Interior is spotless with no tears or stains."
                            </div>
                        </div>
                        <div class="template-section">
                            <h4>4. Features & Equipment</h4>
                            <div class="example good">
                                <strong>Good:</strong> "Loaded with: Heated leather seats, backup camera, Apple CarPlay, sunroof, and premium sound system."
                            </div>
                        </div>
                        <div class="template-section">
                            <h4>5. Call to Action</h4>
                            <div class="example good">
                                <strong>Good:</strong> "Priced to sell quickly. Serious buyers only - call or text to schedule a viewing!"
                            </div>
                        </div>
                    </div>
                </div>

                <div class="guide-card">
                    <div class="card-header">
                        <i class="fas fa-check-circle text-success"></i>
                        <h3>DO These Things</h3>
                    </div>
                    <ul class="do-list">
                        <li><i class="fas fa-check"></i> Use specific numbers (mileage, years, etc.)</li>
                        <li><i class="fas fa-check"></i> Mention maintenance records</li>
                        <li><i class="fas fa-check"></i> List all features and upgrades</li>
                        <li><i class="fas fa-check"></i> Be honest about any issues</li>
                        <li><i class="fas fa-check"></i> Include fuel economy</li>
                        <li><i class="fas fa-check"></i> Mention recent repairs/services</li>
                        <li><i class="fas fa-check"></i> Use bullet points for easy reading</li>
                        <li><i class="fas fa-check"></i> Check your spelling and grammar</li>
                        <li><i class="fas fa-check"></i> Include reason for selling</li>
                        <li><i class="fas fa-check"></i> Add contact preferences</li>
                    </ul>
                </div>

                <div class="guide-card">
                    <div class="card-header">
                        <i class="fas fa-times-circle text-danger"></i>
                        <h3>DON'T Do These</h3>
                    </div>
                    <ul class="dont-list">
                        <li><i class="fas fa-times"></i> Write in all caps</li>
                        <li><i class="fas fa-times"></i> Use excessive exclamation marks!!!</li>
                        <li><i class="fas fa-times"></i> Include personal financial details</li>
                        <li><i class="fas fa-times"></i> Bad-mouth other car brands</li>
                        <li><i class="fas fa-times"></i> Use car dealer language ("cream puff")</li>
                        <li><i class="fas fa-times"></i> Hide known problems</li>
                        <li><i class="fas fa-times"></i> Write one long paragraph</li>
                        <li><i class="fas fa-times"></i> Include irrelevant personal stories</li>
                        <li><i class="fas fa-times"></i> Use vague terms like "runs great"</li>
                        <li><i class="fas fa-times"></i> Forget to proofread</li>
                    </ul>
                </div>

                <div class="guide-card">
                    <div class="card-header">
                        <i class="fas fa-words text-info"></i>
                        <h3>Power Words That Sell</h3>
                    </div>
                    <div class="power-words">
                        <div class="word-category">
                            <h4>Condition Words</h4>
                            <span class="word-tag">Pristine</span>
                            <span class="word-tag">Meticulously maintained</span>
                            <span class="word-tag">Garage-kept</span>
                            <span class="word-tag">One-owner</span>
                            <span class="word-tag">Non-smoker</span>
                        </div>
                        <div class="word-category">
                            <h4>Performance Words</h4>
                            <span class="word-tag">Reliable</span>
                            <span class="word-tag">Fuel-efficient</span>
                            <span class="word-tag">Smooth-running</span>
                            <span class="word-tag">Well-maintained</span>
                            <span class="word-tag">Highway miles</span>
                        </div>
                        <div class="word-category">
                            <h4>Urgency Words</h4>
                            <span class="word-tag">Priced to sell</span>
                            <span class="word-tag">Won't last long</span>
                            <span class="word-tag">Must see</span>
                            <span class="word-tag">Ready to drive</span>
                            <span class="word-tag">Available immediately</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Market Knowledge Section -->
    <section class="guide-section" id="market-section">
        <div class="container">
            <div class="section-header">
                <h2><i class="fas fa-chart-line"></i> Understand Your Market</h2>
                <p>Price it right and position your car to sell quickly in today's market.</p>
            </div>

            <div class="guide-grid">
                <div class="guide-card">
                    <div class="card-header">
                        <i class="fas fa-search-dollar text-success"></i>
                        <h3>Research Your Car's Value</h3>
                    </div>
                    <div class="research-steps">
                        <div class="step">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <h4>Check Multiple Sources</h4>
                                <ul>
                                    <li>Kelley Blue Book (KBB.com)</li>
                                    <li>Edmunds.com</li>
                                    <li>Cars.com market values</li>
                                    <li>Local dealer listings</li>
                                </ul>
                            </div>
                        </div>
                        <div class="step">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <h4>Compare Similar Listings</h4>
                                <ul>
                                    <li>Same year ±1 year</li>
                                    <li>Similar mileage ±10,000 miles</li>
                                    <li>Same trim level/features</li>
                                    <li>Within 50 miles of your location</li>
                                </ul>
                            </div>
                        </div>
                        <div class="step">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <h4>Factor in Your Car's Uniqueness</h4>
                                <ul>
                                    <li>Maintenance history (+$500-2000)</li>
                                    <li>Recent major repairs (+$300-1500)</li>
                                    <li>Premium options (+$200-1000 each)</li>
                                    <li>Cosmetic issues (-$200-2000)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="guide-card">
                    <div class="card-header">
                        <i class="fas fa-target text-warning"></i>
                        <h3>Pricing Strategies</h3>
                    </div>
                    <div class="pricing-strategy">
                        <div class="strategy">
                            <h4><i class="fas fa-bolt text-warning"></i> Quick Sale (1-2 weeks)</h4>
                            <p>Price 5-10% below market average</p>
                            <div class="pros-cons">
                                <div class="pros">
                                    <strong>Pros:</strong> Fast sale, less hassle, fewer lowball offers
                                </div>
                                <div class="cons">
                                    <strong>Cons:</strong> Leave money on the table
                                </div>
                            </div>
                        </div>
                        <div class="strategy">
                            <h4><i class="fas fa-balance-scale text-info"></i> Market Price (2-6 weeks)</h4>
                            <p>Price at market average</p>
                            <div class="pros-cons">
                                <div class="pros">
                                    <strong>Pros:</strong> Fair value, reasonable timeframe
                                </div>
                                <div class="cons">
                                    <strong>Cons:</strong> May sit longer, need to negotiate
                                </div>
                            </div>
                        </div>
                        <div class="strategy">
                            <h4><i class="fas fa-crown text-purple"></i> Premium Price (6+ weeks)</h4>
                            <p>Price 5-15% above market (if justified)</p>
                            <div class="pros-cons">
                                <div class="pros">
                                    <strong>Pros:</strong> Maximum profit, room to negotiate
                                </div>
                                <div class="cons">
                                    <strong>Cons:</strong> Longer sale time, more tire kickers
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="guide-card">
                    <div class="card-header">
                        <i class="fas fa-calendar-alt text-info"></i>
                        <h3>Best Times to Sell</h3>
                    </div>
                    <div class="timing-guide">
                        <div class="timing-item best">
                            <i class="fas fa-thumbs-up"></i>
                            <div>
                                <h4>Best Times</h4>
                                <ul>
                                    <li><strong>Spring (March-May):</strong> People ready for road trips</li>
                                    <li><strong>Friday-Sunday:</strong> More serious buyers browsing</li>
                                    <li><strong>End of tax season:</strong> People have refund money</li>
                                    <li><strong>Before winter (Oct-Nov):</strong> AWD/4WD vehicles</li>
                                </ul>
                            </div>
                        </div>
                        <div class="timing-item avoid">
                            <i class="fas fa-thumbs-down"></i>
                            <div>
                                <h4>Times to Avoid</h4>
                                <ul>
                                    <li><strong>December-January:</strong> Holiday spending, bad weather</li>
                                    <li><strong>Back-to-school season:</strong> Family budget constraints</li>
                                    <li><strong>Major holidays:</strong> People aren't car shopping</li>
                                    <li><strong>Bad weather days:</strong> Fewer people want to travel</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="guide-card">
                    <div class="card-header">
                        <i class="fas fa-handshake text-success"></i>
                        <h3>Negotiation Psychology</h3>
                    </div>
                    <div class="psychology-tips">
                        <div class="tip">
                            <i class="fas fa-brain"></i>
                            <div>
                                <h4>The Anchoring Effect</h4>
                                <p>Your asking price sets the negotiation range. Price high enough to leave room but not so high you scare buyers away.</p>
                            </div>
                        </div>
                        <div class="tip">
                            <i class="fas fa-clock"></i>
                            <div>
                                <h4>Time Pressure Works</h4>
                                <p>Mention other interested buyers (if true) or your timeline for selling to create urgency.</p>
                            </div>
                        </div>
                        <div class="tip">
                            <i class="fas fa-heart"></i>
                            <div>
                                <h4>Emotional Connection</h4>
                                <p>Share positive memories with the car (briefly) to help buyers visualize ownership.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Vehicle Condition Section -->
    <section class="guide-section" id="condition-section">
        <div class="container">
            <div class="section-header">
                <h2><i class="fas fa-search"></i> Is Your Vehicle in Excellent Condition?</h2>
                <p>An honest, in-depth assessment of your vehicle's true condition - and how to improve it.</p>
            </div>

            <div class="condition-assessment">
                <div class="assessment-intro">
                    <div class="warning-box">
                        <i class="fas fa-exclamation-triangle"></i>
                        <div>
                            <h3>Honesty Pays</h3>
                            <p>Being truthful about your car's condition builds trust with buyers and leads to smoother transactions. Hiding problems often backfires during inspections.</p>
                        </div>
                    </div>
                </div>

                <div class="condition-checklist">
                    <div class="checklist-section">
                        <h3><i class="fas fa-eye"></i> Exterior Condition Assessment</h3>
                        <div class="condition-grid">
                            <div class="condition-category excellent">
                                <h4><i class="fas fa-star"></i> Excellent</h4>
                                <ul>
                                    <li><i class="fas fa-check"></i> Paint is glossy with minimal swirl marks</li>
                                    <li><i class="fas fa-check"></i> No dents, dings, or scratches visible from 3 feet</li>
                                    <li><i class="fas fa-check"></i> Chrome/trim pieces are bright and intact</li>
                                    <li><i class="fas fa-check"></i> Headlights are clear, not yellowed</li>
                                    <li><i class="fas fa-check"></i> Tires have even wear, 60%+ tread remaining</li>
                                    <li><i class="fas fa-check"></i> Wheels are straight, no curb rash</li>
                                </ul>
                            </div>
                            <div class="condition-category good">
                                <h4><i class="fas fa-star-half-alt"></i> Good</h4>
                                <ul>
                                    <li><i class="fas fa-minus"></i> Minor paint imperfections, some swirl marks</li>
                                    <li><i class="fas fa-minus"></i> 1-3 small door dings or minor scratches</li>
                                    <li><i class="fas fa-minus"></i> Some chrome/trim showing age</li>
                                    <li><i class="fas fa-minus"></i> Headlights slightly hazy but functional</li>
                                    <li><i class="fas fa-minus"></i> Tires 40-60% tread, even wear</li>
                                    <li><i class="fas fa-minus"></i> Minor wheel imperfections</li>
                                </ul>
                            </div>
                            <div class="condition-category fair">
                                <h4><i class="fas fa-star-o"></i> Fair</h4>
                                <ul>
                                    <li><i class="fas fa-times"></i> Noticeable paint fading or oxidation</li>
                                    <li><i class="fas fa-times"></i> Multiple dings, scratches, or small dents</li>
                                    <li><i class="fas fa-times"></i> Some rust spots or corrosion</li>
                                    <li><i class="fas fa-times"></i> Headlights yellowed, affecting light output</li>
                                    <li><i class="fas fa-times"></i> Tires below 40% tread or uneven wear</li>
                                    <li><i class="fas fa-times"></i> Wheel damage or significant curb rash</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="checklist-section">
                        <h3><i class="fas fa-couch"></i> Interior Condition Assessment</h3>
                        <div class="condition-grid">
                            <div class="condition-category excellent">
                                <h4><i class="fas fa-star"></i> Excellent</h4>
                                <ul>
                                    <li><i class="fas fa-check"></i> Seats show minimal wear, no tears</li>
                                    <li><i class="fas fa-check"></i> Dashboard/door panels crack-free</li>
                                    <li><i class="fas fa-check"></i> All buttons, switches, controls work</li>
                                    <li><i class="fas fa-check"></i> Carpet/floor mats clean, no stains</li>
                                    <li><i class="fas fa-check"></i> No odors (smoke, pet, spills)</li>
                                    <li><i class="fas fa-check"></i> All lights, electronics function</li>
                                </ul>
                            </div>
                            <div class="condition-category good">
                                <h4><i class="fas fa-star-half-alt"></i> Good</h4>
                                <ul>
                                    <li><i class="fas fa-minus"></i> Light seat wear, no significant damage</li>
                                    <li><i class="fas fa-minus"></i> Minor dashboard/trim wear</li>
                                    <li><i class="fas fa-minus"></i> Most controls work, 1-2 minor issues</li>
                                    <li><i class="fas fa-minus"></i> Some carpet wear, minor staining</li>
                                    <li><i class="fas fa-minus"></i> Faint odors, mostly eliminated</li>
                                    <li><i class="fas fa-minus"></i> Most electronics work</li>
                                </ul>
                            </div>
                            <div class="condition-category fair">
                                <h4><i class="fas fa-star-o"></i> Fair</h4>
                                <ul>
                                    <li><i class="fas fa-times"></i> Noticeable seat wear, small tears</li>
                                    <li><i class="fas fa-times"></i> Dashboard cracks or significant wear</li>
                                    <li><i class="fas fa-times"></i> Several non-working controls</li>
                                    <li><i class="fas fa-times"></i> Stained or worn carpet</li>
                                    <li><i class="fas fa-times"></i> Persistent odors</li>
                                    <li><i class="fas fa-times"></i> Some electronics don't work</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="checklist-section">
                        <h3><i class="fas fa-cog"></i> Mechanical Condition Assessment</h3>
                        <div class="condition-grid">
                            <div class="condition-category excellent">
                                <h4><i class="fas fa-star"></i> Excellent</h4>
                                <ul>
                                    <li><i class="fas fa-check"></i> Engine starts immediately, idles smoothly</li>
                                    <li><i class="fas fa-check"></i> Transmission shifts perfectly</li>
                                    <li><i class="fas fa-check"></i> Brakes feel firm, no noise</li>
                                    <li><i class="fas fa-check"></i> Suspension smooth, no bouncing</li>
                                    <li><i class="fas fa-check"></i> No warning lights on dashboard</li>
                                    <li><i class="fas fa-check"></i> All fluids clean and topped off</li>
                                    <li><i class="fas fa-check"></i> Recent maintenance records</li>
                                </ul>
                            </div>
                            <div class="condition-category good">
                                <h4><i class="fas fa-star-half-alt"></i> Good</h4>
                                <ul>
                                    <li><i class="fas fa-minus"></i> Engine starts well, minor roughness</li>
                                    <li><i class="fas fa-minus"></i> Transmission occasionally hesitates</li>
                                    <li><i class="fas fa-minus"></i> Brakes work well, minor noise</li>
                                    <li><i class="fas fa-minus"></i> Suspension mostly smooth</li>
                                    <li><i class="fas fa-minus"></i> One minor warning light (tire pressure, etc.)</li>
                                    <li><i class="fas fa-minus"></i> Most fluids good condition</li>
                                    <li><i class="fas fa-minus"></i> Some maintenance records</li>
                                </ul>
                            </div>
                            <div class="condition-category fair">
                                <h4><i class="fas fa-star-o"></i> Fair</h4>
                                <ul>
                                    <li><i class="fas fa-times"></i> Engine hard starting or rough idle</li>
                                    <li><i class="fas fa-times"></i> Transmission slips or shifts hard</li>
                                    <li><i class="fas fa-times"></i> Brakes need attention (grinding, soft pedal)</li>
                                    <li><i class="fas fa-times"></i> Suspension bouncy or noisy</li>
                                    <li><i class="fas fa-times"></i> Multiple warning lights</li>
                                    <li><i class="fas fa-times"></i> Fluids dirty or low</li>
                                    <li><i class="fas fa-times"></i> Limited maintenance records</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="improvement-tips">
                    <h3><i class="fas fa-tools"></i> Quick Improvements That Pay Off</h3>
                    <div class="improvement-grid">
                        <div class="improvement-card">
                            <div class="card-header">
                                <i class="fas fa-dollar-sign text-success"></i>
                                <h4>Under $50 Fixes</h4>
                            </div>
                            <ul>
                                <li>Professional car wash and detail ($20-40)</li>
                                <li>Touch-up paint for small scratches ($10-20)</li>
                                <li>Headlight restoration kit ($15-25)</li>
                                <li>New air freshener (remove odors) ($5-15)</li>
                                <li>Armor All for interior plastic ($10-20)</li>
                                <li>Clean engine bay ($0-30)</li>
                            </ul>
                        </div>
                        <div class="improvement-card">
                            <div class="card-header">
                                <i class="fas fa-dollar-sign text-warning"></i>
                                <h4>$50-200 Fixes</h4>
                            </div>
                            <ul>
                                <li>Professional paint correction ($75-150)</li>
                                <li>New wiper blades and fluids ($25-50)</li>
                                <li>Basic maintenance (oil, filter) ($50-100)</li>
                                <li>Tire rotation and balance ($60-120)</li>
                                <li>Replace burned out bulbs ($20-80)</li>
                                <li>Seat covers for damaged seats ($40-150)</li>
                            </ul>
                        </div>
                        <div class="improvement-card">
                            <div class="card-header">
                                <i class="fas fa-calculator text-info"></i>
                                <h4>Worth the Investment?</h4>
                            </div>
                            <div class="investment-guide">
                                <div class="investment-rule">
                                    <h5>The 10% Rule</h5>
                                    <p>Only spend on repairs if they add more than 10% to your sale price</p>
                                </div>
                                <div class="investment-rule">
                                    <h5>Safety First</h5>
                                    <p>Fix safety issues (brakes, tires) - buyers notice and trust matters</p>
                                </div>
                                <div class="investment-rule">
                                    <h5>Disclosure is Key</h5>
                                    <p>Better to price lower than spend on major repairs you can't recoup</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h4>QRCarShop</h4>
                    <p>The modern way to sell cars with QR codes</p>
                </div>
                <div class="footer-section">
                    <h4>Seller Resources</h4>
                    <ul>
                        <li><a href="seller-guide.html">Seller's Guide</a></li>
                        <li><a href="dashboard.html">Dashboard</a></li>
                        <li><a href="#pricing-tool">Pricing Tool</a></li>
                        <li><a href="#qr-generator">QR Generator</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Support</h4>
                    <ul>
                        <li><a href="#faq">FAQ</a></li>
                        <li><a href="#contact">Contact Us</a></li>
                        <li><a href="#help">Help Center</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Connect</h4>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-facebook"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 QRCarShop. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script src="js/seller-guide.js"></script>
</body>
</html>
