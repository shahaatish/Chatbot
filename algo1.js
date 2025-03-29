document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const chatBody = document.getElementById('chat-body');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const learningIndicator = document.getElementById('learning-indicator');
    
    // Enhanced knowledge base (same as your original)
    let knowledgeBase = {
        greetings: {
            patterns: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'howdy', 'what\'s up', 'yo', 'hiya', 'morning', 'afternoon', 'evening', 'sup', 'hi there', 'hello there', 'hey there'],
            responses: ['Hello! How can I help you today?', 'Hi there! What can I do for you?', 'Hey! How can I assist you?', 'Good to see you! How may I help?', 'Hello! What brings you here today?']
        },
        farewell: {
            patterns: ['bye', 'goodbye', 'see you', 'see you later', 'talk to you later', 'have a good day', 'have a nice day', 'catch you later', 'later', 'until next time', 'take care', 'gotta go', 'i\'m off', 'signing off', 'cya', 'farewell'],
            responses: ['Goodbye! Have a great day!', 'See you later!', 'Talk to you next time!', 'Take care! Come back anytime.', 'Farewell! Looking forward to our next chat.', 'Until next time! Have a wonderful day.']
        },
        thanks: {
            patterns: ['thank you', 'thanks', 'appreciate it', 'thank you so much', 'thanks a lot', 'many thanks', 'thx', 'ty', 'thanks for your help', 'grateful', 'much appreciated'],
            responses: ['You are welcome!', 'Happy to help!', 'No problem at all!', 'Anytime!', 'Glad I could assist.', 'My pleasure!', 'It was my pleasure to help!', 'You are most welcome!']
        },
        about: {
            patterns: ['who are you', 'what are you', 'tell me about yourself', 'introduce yourself', 'your identity', 'about you', 'what\'s your name', 'who created you', 'how were you made', 'your purpose'],
            responses: ['I\'m a self-learning chatbot designed to get smarter with every interaction!',
                      'I\'m an AI assistant that learns from our conversations to serve you better.',
                      'I\'m a virtual assistant continuously improving through our conversations.',
                      'I\'m an AI chatbot programmed to help with information and assistance while learning from each interaction.']
        },
        help: {
            patterns: ['help', 'how do you work', 'what can you do', 'your capabilities', 'your functions', 'your features', 'assist me', 'i need assistance', 'guide me', 'how to use', 'instructions', 'commands'],
            responses: ['I can answer questions and learn from our interactions. Try asking me something!',
                      'I\'m here to chat and learn from you. The more we talk, the smarter I get!',
                      'I can provide information, answer questions, assist with tasks, and learn from our conversations.',
                      'I\'m designed to help with various queries, provide information, and improve my capabilities as we chat.']
        },
        weather: {
            patterns: ['weather', 'how\'s the weather', 'forecast', 'is it going to rain', 'temperature', 'is it hot', 'is it cold', 'weather forecast', 'weather today', 'weather tomorrow'],
            responses: ['I don\'t have real-time weather data, but I can help you find a weather service to check your local forecast.',
                      'While I can\'t check the current weather, I can suggest some reliable weather apps you might want to try.',
                      'Would you like me to guide you to resources where you can check the weather forecast?']
        },
        time: {
            patterns: ['what time is it', 'current time', 'time now', 'what\'s the time', 'tell me the time', 'clock', 'hour', 'date today', 'today\'s date', 'what day is it'],
            responses: ['I don\'t have access to your current time, but you can check your device clock.',
                      'I can\'t provide the current time, but you can look at your screen\'s clock or ask your device.',
                      'I don\'t have access to real-time data like current time, but your device should display it.']
        },
        jokes: {
            patterns: ['tell me a joke', 'joke', 'funny', 'make me laugh', 'humor', 'comedy', 'amuse me', 'say something funny', 'got any jokes'],
            responses: ['Why don\'t scientists trust atoms? Because they make up everything!',
                      'What did the ocean say to the beach? Nothing, it just waved!',
                      'Why did the scarecrow win an award? Because he was outstanding in his field!',
                      'How does a penguin build its house? Igloos it together!',
                      'Why don\'t eggs tell jokes? They\'d crack each other up!']
        },
        facts: {
            patterns: ['tell me a fact', 'random fact', 'interesting fact', 'did you know', 'fun fact', 'give me a fact', 'fact of the day'],
            responses: ['The shortest war in history was between Britain and Zanzibar in 1896, lasting only 38 minutes.',
                      'Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly good to eat.',
                      'A day on Venus is longer than a year on Venus. It takes 243 Earth days to rotate once on its axis but only 225 Earth days to orbit the Sun.',
                      'Octopuses have three hearts, nine brains, and blue blood.',
                      'The Great Wall of China is not visible from space with the naked eye, contrary to popular belief.']
        },
        recommendations: {
            patterns: ['recommend', 'suggestion', 'what should i', 'advise', 'what do you recommend', 'suggestions', 'what do you suggest', 'good movie', 'good book', 'good restaurant'],
            responses: ['I\'d need more specific information about your preferences to make a personalized recommendation.',
                      'What kind of recommendations are you looking for? Movies, books, activities?',
                      'I would be happy to suggest something if you could tell me more about what you are interested in.']
        },
        feelings: {
            patterns: ['how are you', 'how are you doing', 'how do you feel', 'are you ok', 'are you okay', 'you good', 'what\'s up with you', 'how\'s it going', 'how has your day been', 'feeling good'],
            responses: ['I\'m doing well, thanks for asking! How about you?',
                      'I\'m functioning perfectly! How are you today?',
                      'All systems operational and ready to help! How are you feeling?',
                      'I\'m good! More importantly, how can I assist you today?']
        },
        compliments: {
            patterns: ['you\'re smart', 'you\'re intelligent', 'you\'re helpful', 'you\'re awesome', 'you\'re amazing', 'you\'re good', 'you\'re great', 'you\'re the best', 'you\'re fantastic', 'good job', 'well done', 'nice work'],
            responses: ['Thank you for the kind words!',
                      'I appreciate that! I\'m here to help.',
                      'That\'s very nice of you to say!',
                      'Thank you! I\'m constantly learning to serve you better.']
        },
        age: {
            patterns: ['how old are you', 'your age', 'when were you born', 'what\'s your age', 'when were you created', 'your birthday', 'birth date', 'how long have you existed'],
            responses: ['I don\'t have an age in the traditional sense. I\'m a program that continues to evolve!',
                      'I don\'t have a birthday - I\'m a constantly learning AI assistant.',
                      'I exist outside the concept of human aging, but I\'m continually being improved and updated!']
        },
        preferences: {
            patterns: ['do you like', 'what\'s your favorite', 'do you prefer', 'do you enjoy', 'do you hate', 'do you love', 'your favorite', 'best in your opinion', 'what do you think about'],
            responses: ['As an AI, I don\'t have personal preferences, but I can certainly help you with yours!',
                      'I don\'t experience likes and dislikes, but I\'d love to hear about yours!',
                      'I\'m more interested in your preferences! What do you enjoy?']
        },
        location: {
            patterns: ['where are you', 'your location', 'where do you live', 'which country are you in', 'which city are you in', 'where are you from', 'where are you located', 'where do you come from'],
            responses: ['I exist digitally and don\'t have a physical location!',
                      'I\'m a digital assistant, so I exist wherever my programming is running.',
                      'I don\'t have a physical presence - I\'m here to help you wherever you are!']
        },
        clarification: {
            patterns: ['what do you mean', 'i don\'t understand', 'explain', 'clarify', 'what\'s that', 'can you explain', 'don\'t get it', 'confused', 'elaborate', 'be more specific'],
            responses: ['I\'d be happy to clarify. Which part would you like me to explain further?',
                      'Let me try to explain that differently. What specifically confused you?',
                      'I apologize for not being clear. Let me know which part you\'d like me to elaborate on.']
        },
        apologies: {
            patterns: ['sorry', 'my apologies', 'forgive me', 'apologize', 'my bad', 'my mistake', 'didn\'t mean to', 'apologies'],
            responses: ['No need to apologize!',
                      'That\'s perfectly alright, no worries.',
                      'No problem at all!',
                      'No need for apologies - I\'m here to help.']
        },
        repetition: {
            patterns: ['repeat that', 'say that again', 'could you repeat', 'say it again', 'one more time', 'didn\'t hear you'],
            responses: ['I\'d be happy to repeat my last message. Let me know if you need further clarification.',
                      'Of course, here\'s what I said before: [LAST_MESSAGE]',
                      'Let me repeat that for you: [LAST_MESSAGE]']
        },
        music: {
            patterns: ['music', 'songs', 'what should i listen to', 'playlist', 'recommend music', 'favorite song', 'music recommendation', 'good songs', 'genre'],
            responses: ['I can\'t play music directly, but I can suggest some popular genres or artists based on your preferences.',
                      'While I can\'t stream music, I can help you find recommendations if you tell me what genres you enjoy.',
                      'What kind of music do you typically enjoy? I can suggest some artists or genres you might like.']
        },
        movies: {
            patterns: ['movie', 'film', 'what should i watch', 'recommend a movie', 'good films', 'movie recommendation', 'tv show', 'series', 'documentary', 'what\'s on netflix'],
            responses: ['I\'d need to know your preferences to recommend a movie. What genres do you enjoy?',
                      'There are many great movies out there! What kind of films do you typically like?',
                      'I can suggest some popular movies if you tell me what genres or themes interest you.']
        },
        food: {
            patterns: ['food', 'recipe', 'what should i eat', 'dinner', 'lunch', 'breakfast', 'meal', 'cooking', 'restaurant', 'cuisine', 'healthy food', 'fast food'],
            responses: ['I can suggest some recipes if you tell me what ingredients you have or what cuisine you enjoy.',
                      'There are countless delicious options! What kind of food are you in the mood for?',
                      'Are you looking for a recipe to cook at home or restaurant recommendations?']
        },
        health: {
            patterns: ['health', 'exercise', 'workout', 'diet', 'fitness', 'wellness', 'healthy lifestyle', 'mental health', 'meditation', 'stress', 'anxiety', 'depression'],
            responses: ['While I can share general health information, it\'s always best to consult with healthcare professionals for personalized advice.',
                      'Health is important! There are many aspects to wellness including physical activity, nutrition, and mental health.',
                      'I can share general wellness tips, but remember that personalized health advice should come from qualified professionals.']
        },
        technology: {
            patterns: ['technology', 'tech', 'gadget', 'software', 'hardware', 'computer', 'phone', 'laptop', 'app', 'programming', 'coding', 'artificial intelligence', 'ai'],
            responses: ['Technology is constantly evolving! What specific aspect are you interested in learning about?',
                      'The tech world moves quickly! Is there a particular technology or trend you\'d like to discuss?',
                      'I find technology fascinating! What specific tech topic would you like to talk about?']
        },
        business: {
            patterns: ['business', 'startup', 'entrepreneur', 'investment', 'marketing', 'finance', 'management', 'career', 'job', 'interview', 'resume', 'linkedin', 'networking'],
            responses: ['Business and career topics are quite broad. What specific aspect are you interested in?',
                      'There\'s so much to discuss in the business world! What particular area interests you?',
                      'I can share general business insights. What specific business topic would you like to explore?']
        },
        education: {
            patterns: ['education', 'learning', 'school', 'college', 'university', 'course', 'degree', 'study', 'homework', 'assignment', 'exam', 'test', 'quiz', 'grades'],
            responses: ['Education is a lifelong journey! What specific educational topic are you interested in?',
                      'Learning is so important! What aspect of education would you like to discuss?',
                      'I can share general educational insights. What specific learning topic are you curious about?']
        },
        positive: {
            patterns: ['happy', 'excited', 'good news', 'great', 'excellent', 'wonderful', 'amazing', 'fantastic', 'terrific', 'awesome', 'brilliant', 'success', 'achievement', 'celebrate'],
            responses: ['That sounds wonderful! I\'m glad to hear it!',
                      'That\'s fantastic news! Thanks for sharing your positivity.',
                      'How wonderful! It\'s great to hear such positive things.']
        },
        negative: {
            patterns: ['sad', 'upset', 'bad news', 'terrible', 'awful', 'horrible', 'disappointed', 'frustrated', 'angry', 'mad', 'furious', 'depressed', 'failure', 'mistake'],
            responses: ['I\'m sorry to hear that. Would you like to talk about it?',
                      'That sounds difficult. I\'m here to listen if you want to share more.',
                      'I\'m sorry you\'re feeling that way. Is there anything I can do to help?']
        },
        travel: {
            patterns: ['travel', 'vacation', 'holiday', 'trip', 'journey', 'destination', 'tourist', 'sightseeing', 'hotel', 'flight', 'beach', 'mountains', 'city', 'country'],
            responses: ['Traveling can be so enriching! Do you have a particular destination in mind?',
                      'There are so many wonderful places to explore! What kind of travel experiences do you enjoy?',
                      'I love discussing travel! What destinations are on your bucket list?']
        },
        personal: {
            patterns: ['married', 'single', 'dating', 'relationship', 'girlfriend', 'boyfriend', 'husband', 'wife', 'partner', 'family', 'children', 'kids', 'parents', 'siblings'],
            responses: ['I\'m here to assist with information and conversations, not to collect personal details.',
                      'I appreciate you sharing, but I don\'t need personal information to help you.',
                      'While I\'m here to chat, I don\'t need personal details to provide assistance.']
        },
        fallback: {
            responses: ['I\'m not sure I understand. Could you rephrase that?', 
                      'I\'m still learning about that. Can you tell me more?',
                      'I don\'t have information on that yet. Could you explain further?',
                      'I\'m not quite following. Could you elaborate or ask in a different way?',
                      'That\'s an interesting topic, but I might need more context to properly respond.',
                      'I\'m always learning! Could you provide more details so I can better assist you?']
        },
    
        sports: {
            patterns: ['sports', 'game', 'team', 'player', 'football', 'soccer', 'basketball', 'baseball', 'tennis', 'golf', 'hockey', 'match', 'tournament', 'championship', 'world cup', 'olympics', 'athlete', 'fitness'],
            responses: ['Are you a sports fan? Which teams or athletes do you follow?',
                      'Sports can be so exciting to watch and play! What\'s your favorite?',
                      'I wish I could catch a game sometime! What sport do you enjoy most?',
                      'Sports bring people together like nothing else. Do you play any or just watch?']
        },
        pets: {
            patterns: ['pet', 'dog', 'cat', 'fish', 'bird', 'hamster', 'guinea pig', 'rabbit', 'animal', 'veterinarian', 'adoption', 'rescue', 'puppy', 'kitten', 'breed', 'training'],
            responses: ['Pets bring so much joy! Do you have any furry (or scaly) friends at home?',
                      'I love hearing about people\'s pets! What kind of animals do you have or want to have?',
                      'Pets are family members with fur (or scales or feathers)! Tell me about yours.',
                      'Animals can be such amazing companions. Do you have any pets in your life?']
        },
        gaming: {
            patterns: ['game', 'gaming', 'video game', 'console', 'pc gaming', 'playstation', 'xbox', 'nintendo', 'switch', 'steam', 'multiplayer', 'esports', 'rpg', 'fps', 'mmorpg', 'minecraft', 'fortnite', 'among us'],
            responses: ['Gaming is huge these days! What have you been playing recently?',
                      'Are you more of a casual gamer or do you get pretty competitive?',
                      'What type of games do you enjoy most? I find it fascinating how diverse gaming has become.',
                      'Console or PC? That\'s the eternal question for many gamers!']
        },
        shopping: {
            patterns: ['shopping', 'buy', 'purchase', 'store', 'mall', 'online shopping', 'amazon', 'ebay', 'retail', 'deal', 'discount', 'sale', 'price', 'product', 'brand', 'clothes', 'fashion'],
            responses: ['Finding anything good? What kind of shopping are you doing?',
                      'Online shopping has changed everything. Do you prefer that or the in-store experience?',
                      'Looking for anything specific, or just browsing for deals?',
                      'Shopping can be fun or stressful depending on what you\'re looking for. What\'s your mission?']
        },
        social_media: {
            patterns: ['social media', 'facebook', 'instagram', 'twitter', 'tiktok', 'snapchat', 'youtube', 'linkedin', 'pinterest', 'reddit', 'post', 'like', 'comment', 'share', 'follow', 'trending', 'viral', 'influencer'],
            responses: ['Social media is such a double-edged sword, isn\'t it? Which platforms do you use most?',
                      'The social media landscape keeps changing so quickly. Which ones do you prefer?',
                      'Social apps can be addictive! Do you find yourself checking them often?',
                      'Do you use social media more for keeping up with friends or following content creators?']
        },
        books: {
            patterns: ['book', 'reading', 'novel', 'author', 'fiction', 'non-fiction', 'fantasy', 'sci-fi', 'mystery', 'thriller', 'romance', 'literature', 'bestseller', 'ebook', 'audiobook', 'kindle', 'library', 'bookstore'],
            responses: ['Nothing beats getting lost in a good book! What are you reading currently?',
                      'I love book talk! What genres do you typically enjoy reading?',
                      'Physical books, e-readers, or audiobooks? Everyone seems to have a preference!',
                      'Reading anything interesting lately? I\'d love to hear about your latest book.']
        },
        news: {
            patterns: ['news', 'current events', 'headline', 'politics', 'election', 'economy', 'world news', 'breaking news', 'newspaper', 'journalist', 'media', 'press', 'update', 'report'],
            responses: ['Keeping up with the news can be important but overwhelming sometimes. Any specific topics you follow closely?',
                      'The news cycle moves so quickly these days. What kinds of stories do you find most important to follow?',
                      'Finding reliable news sources is crucial. How do you typically stay informed?',
                      'Anything interesting happening in the news that you\'ve been following?']
        },
        science: {
            patterns: ['science', 'research', 'discovery', 'experiment', 'theory', 'physics', 'chemistry', 'biology', 'astronomy', 'space', 'planet', 'star', 'galaxy', 'universe', 'quantum', 'lab', 'scientist', 'breakthrough'],
            responses: ['Science is fascinating! Any particular field that interests you most?',
                      'The pace of scientific discovery these days is incredible. What aspects of science interest you?',
                      'Science explains so much about our world. Are you curious about any specific scientific topics?',
                      'From microscopic to cosmic scale, science covers it all. What area of science catches your interest?']
        },
        art: {
            patterns: ['art', 'painting', 'drawing', 'sculpture', 'artist', 'museum', 'gallery', 'exhibition', 'creative', 'design', 'photography', 'photographer', 'portrait', 'landscape', 'abstract', 'modern art', 'classical art'],
            responses: ['Art speaks to us in such personal ways. Do you create art yourself or prefer appreciating others\' work?',
                      'The art world is so diverse! What styles or periods do you find most appealing?',
                      'Art can be such a powerful form of expression. What kind of art resonates with you?',
                      'Do you have favorite artists or art movements? I find the history of art so fascinating.']
        },
        language: {
            patterns: ['language', 'translation', 'bilingual', 'multilingual', 'english', 'spanish', 'french', 'german', 'chinese', 'japanese', 'italian', 'russian', 'arabic', 'learning language', 'fluent', 'native speaker', 'foreign language'],
            responses: ['Languages open doors to new cultures and perspectives. Do you speak multiple languages?',
                      'Learning a new language can be challenging but so rewarding. Are you studying any languages currently?',
                      'The nuances between languages can be fascinating. Which languages are you interested in?',
                      'Language shapes how we think in subtle ways. Have you experienced that when using different languages?']
        },
        hobbies: {
            patterns: ['hobby', 'craft', 'knitting', 'crochet', 'sewing', 'gardening', 'fishing', 'hiking', 'camping', 'photography', 'collecting', 'woodworking', 'DIY', 'baking', 'cooking', 'painting', 'drawing', 'model building'],
            responses: ['Hobbies add so much richness to life! What do you enjoy doing in your free time?',
                      'Having creative outlets is so important. What hobbies do you particularly enjoy?',
                      'Free time is precious - how do you like to spend yours?',
                      'I find people\'s hobbies say a lot about them. What activities do you gravitate toward?']
        },
        future: {
            patterns: ['future', 'plan', 'goal', 'dream', 'ambition', 'aspiration', 'hope', 'tomorrow', 'next year', 'five years', '10 years', 'someday', 'eventually', 'career goal', 'life goal', 'bucket list'],
            responses: ['The future holds so many possibilities! What are you looking forward to?',
                      'Having goals can give us direction. What are you working toward right now?',
                      'Dreams for the future can be so motivating. What\'s something you hope to achieve?',
                      'Where do you see yourself in a few years? It\'s always interesting to think about our paths.']
        },
        environment: {
            patterns: ['environment', 'climate', 'climate change', 'global warming', 'recycling', 'sustainability', 'renewable', 'green energy', 'solar power', 'wind power', 'conservation', 'pollution', 'carbon footprint', 'eco-friendly', 'zero waste'],
            responses: ['Environmental issues affect us all. Is sustainability something you\'re concerned about?',
                      'The environment is such an important topic. Have you made any changes to live more sustainably?',
                      'Climate concerns are on many people\'s minds these days. What aspects interest or worry you most?',
                      'Balancing human needs with environmental protection is complex. What are your thoughts on this?']
        },
        emergency: {
            patterns: ['emergency', 'help me', 'danger', 'urgent', 'crisis', 'medical emergency', 'call 911', 'suicide', 'hurt myself', 'self harm', 'kill myself', 'injured', 'dying', 'life threatening'],
            responses: ['If you\'re experiencing an emergency, please contact emergency services like 911 immediately. I\'m just a chatbot and can\'t provide emergency help.',
                      'This sounds serious. If you\'re in danger, please call emergency services (911 in the US) right away. Don\'t wait.',
                      'Your safety is important. Please reach out to emergency services or a crisis helpline immediately. In the US, you can call 988 for the Suicide & Crisis Lifeline.',
                      'I\'m concerned about what you\'re sharing. Please contact emergency services or call the National Suicide Prevention Lifeline at 988 if you\'re in crisis.']
        },
        feedback: {
            patterns: ['feedback', 'suggestion', 'improve', 'improvement', 'better', 'feature', 'bug', 'issue', 'problem', 'not working', 'error', 'glitch', 'enhancement', 'upgrade', 'update'],
            responses: ['I appreciate feedback! It helps me improve. What specifically could be better?',
                      'Thanks for taking the time to share your thoughts. What would make your experience better?',
                      'Your feedback matters! What would you like to see improved or added?',
                      'I\'m always looking to get better. What specifically would you change or improve?']
        },
        philosophical: {
            patterns: ['meaning of life', 'purpose', 'existence', 'consciousness', 'reality', 'philosophy', 'existential', 'metaphysics', 'ethics', 'morality', 'free will', 'determinism', 'human nature', 'soul', 'spiritual', 'religion', 'god', 'afterlife'],
            responses: ['That\'s a profound question that people have pondered for centuries. What are your thoughts on it?',
                      'Philosophy tackles some of the deepest questions we can ask. What perspective resonates with you?',
                      'Those big existential questions are fascinating to think about. Have you been contemplating this recently?',
                      'That\'s something I find myself thinking about too. What led you to this philosophical question?']
        },
        creativity: {
            patterns: ['create', 'creative', 'idea', 'brainstorm', 'inspiration', 'innovative', 'imagination', 'original', 'unique', 'design', 'invent', 'novel', 'artistic', 'creativity', 'generate'],
            responses: ['Creativity comes in so many forms! What kind of creative project are you working on?',
                      'Creative thinking is such a valuable skill. What kind of ideas are you exploring?',
                      'I love hearing about creative endeavors! What are you looking to create?',
                      'The creative process can be both exciting and challenging. What stage are you at with your project?']
        },
    
    
    
    
    
            productivity: {
                patterns: ['how to be more productive', 'time management tips', 'beat procrastination', 'focus techniques', 'pomodoro method', 'daily routine', 'get things done', 'stop wasting time'],
                responses: [
                    'Try the Pomodoro Technique: 25 minutes of focused work, then a 5-minute break. Want me to time a session for you?',
                    'Start each day by writing your "Top 3" must-do tasks. What\'s one important thing you need to accomplish today?',
                    'Procrastination often happens when tasks feel too big. Can you break your next project into smaller steps?'
                ]
            },
        
            mental_health: {
                patterns: ['reduce stress', 'anxiety relief', 'mindfulness exercises', 'self-care ideas', 'feel overwhelmed', 'burnout recovery', 'mental health tips', 'calm down'],
                responses: [
                    'The 4-7-8 breathing technique helps: inhale for 4 sec, hold for 7, exhale for 8. Want to try it together?',
                    'Burnout is real. Try scheduling "me time" like you would any important appointment. What activity recharges you?',
                    'When overwhelmed, list what\'s actually urgent vs. what can wait. What\'s weighing on you most right now?'
                ]
            },
        
            finance: {
                patterns: ['save money', 'budgeting tips', 'investing for beginners', 'reduce expenses', 'best savings app', 'credit score', 'get out of debt', 'financial advice'],
                responses: [
                    'The 50/30/20 rule helps: 50% needs, 30% wants, 20% savings/debt. Need help applying this to your income?',
                    'Apps like Mint or YNAB automatically track spending. What\'s your biggest financial goal right now?',
                    'Start by reviewing recurring subscriptions - people often find $100+/month they can save. Need help looking?'
                ]
            },
        
            cooking: {
                patterns: ['easy dinner recipes', 'meal prep ideas', 'vegetarian dishes', 'baking tips', 'quick breakfast', 'healthy snacks', 'cooking for beginners', 'kitchen hacks'],
                responses: [
                    'Sheet pan dinners are easy: protein + veggies + oil + seasoning, bake at 400°F for 20 mins. Need protein suggestions?',
                    'Overnight oats are perfect for meal prep: 1/2 cup oats + 1 cup milk + toppings. Favorite flavor combinations?',
                    'Pro tip: Always preheat your pan before adding oil to prevent sticking. What are you cooking tonight?'
                ]
            },
        
            career: {
                patterns: ['resume tips', 'job interview prep', 'career change advice', 'remote work', 'salary negotiation', 'linkedin profile', 'quit my job', 'promotion tips'],
                responses: [
                    'For resumes: Use action verbs like "led", "achieved", and quantify results when possible. Need a second look?',
                    'STAR method works great for interviews: Situation, Task, Action, Result. Preparing for any specific questions?',
                    'When negotiating salary, research industry averages first. Glassdoor can help. What field are you in?'
                ]
            },
        
            travel: {
                patterns: ['packing list', 'cheap flights', 'solo travel tips', 'best travel insurance', 'local etiquette', 'hidden gems', 'travel hacks', 'best time to visit'],
                responses: [
                    'Roll clothes instead of folding to save space! Traveling to a warm or cold climate?',
                    'Use Skyscanner\'s "Everywhere" feature to find cheap destinations from your airport. Flexible on dates?',
                    'For solo travel: Always share your itinerary with someone back home. Planning any adventures?'
                ]
            },
        
            home_organization: {
                patterns: ['declutter tips', 'small space organization', 'cleaning hacks', 'konmari method', 'minimalism', 'organize my home', 'storage solutions'],
                responses: [
                    'Try the "20/10" method: Clean for 20 minutes, break for 10. Which room needs the most help?',
                    'The KonMari question: "Does this spark joy?" works wonders for clothes. Need motivation to start?',
                    'Vertical storage (shelves, hooks) maximizes small spaces. What area feels most cluttered?'
                ]
            },
        
            parenting: {
                patterns: ['toddler activities', 'positive discipline', 'screen time limits', 'newborn sleep tips', 'work-life balance parents', 'pickyeater', 'child development'],
                responses: [
                    'Sensory bins (rice + small toys) can entertain toddlers for hours. How old is your child?',
                    'For picky eaters: Try "food bridges" - if they like chicken nuggets, try chicken meatballs next. What foods do they currently eat?',
                    'Consistent bedtime routines help kids sleep better. What time does your little one go to bed?'
                ]
            },
        
            diy: {
                patterns: ['fix leaky faucet', 'wall painting tips', 'furniture assembly', 'beginner woodworking', 'home renovation', 'power tools', 'home repair'],
                responses: [
                    'For painting: Use painter\'s tape and cut in edges first before rolling. Need color suggestions?',
                    'YouTube tutorials are gold for DIY projects! What are you working on?',
                    'Pro tip: Always turn off water at the source before plumbing repairs. Need help locating valves?'
                ]
            },
        
            pet_care: {
                patterns: ['train a puppy', 'cat litter box tips', 'dog-friendly recipes', 'pet adoption process', 'vet recommendations', 'pet health', 'new pet'],
                responses: [
                    'Positive reinforcement (treats!) works best for training. What\'s your pet\'s name and breed?',
                    'For cats: Have n+1 litter boxes (if you have 2 cats, get 3 boxes). Any specific litter issues?',
                    'Homemade dog treats: Mix pumpkin puree + peanut butter + flour, bake at 350°F. Want the full recipe?'
                ]
            },
        
            // Additional categories can be added below...
            personal_development: {
                patterns: ['build confidence', 'public speaking tips', 'how to network', 'critical thinking', 'learn faster', 'social skills', 'be more assertive'],
                responses: [
                    'Start small: Compliment one person daily to build confidence. What social situations make you nervous?',
                    'For networking: Ask open-ended questions and really listen. Any upcoming events you\'re preparing for?',
                    'The "5 Whys" technique helps critical thinking: Ask "why?" five times to get to root causes. Facing any tough decisions?'
                ]
            },
        
            sustainability: {
                patterns: ['zero waste tips', 'composting guide', 'eco-friendly products', 'reduce plastic use', 'thrift shopping', 'sustainable living', 'climate change'],
                responses: [
                    'Start with reusable bags, bottles, and containers. Which single-use item do you use most?',
                    'Composting basics: Mix "greens" (food scraps) with "browns" (leaves/paper). Need help setting up a system?',
                    'Thrifting saves money and the planet! Looking for clothes, furniture, or something specific?'
                ]
            },
        
             sleep_health: {
                    patterns: ['can\'t sleep', 'insomnia tips', 'sleep better', 'waking up tired', 'best sleep position', 'sleep schedule', 'dream meaning', 'nap benefits'],
                    responses: [
                        'The 4-7-8 breathing method helps: inhale 4 sec, hold 7, exhale 8. Want a guided routine?',
                        'Keep your bedroom at 60-67°F (15-19°C) for optimal sleep. Having trouble falling or staying asleep?',
                        'Pro tip: Avoid screens 1 hour before bed - try reading instead. What\'s your current bedtime routine?'
                    ]
                },
            
             car_maintenance: {
                    patterns: ['change oil', 'tire pressure', 'jump start car', 'car won\'t start', 'check engine light', 'basic car care', 'winter car prep', 'fuel efficiency'],
                    responses: [
                        'Check oil monthly: Park on level ground, wait 5 mins after driving, pull dipstick. Need help locating it?',
                        'Tire pressure affects safety and MPG. Find the PSI rating on your door jamb sticker. Want winter tire advice?',
                        'For jump starts: RED to dead battery +, RED to good battery +, BLACK to good battery -, BLACK to unpainted metal. Need diagram?'
                    ]
                },
            
                student_life: {
                    patterns: ['study tips', 'memorization techniques', 'beat exam stress', 'take better notes', 'time management for students', 'online classes', 'group projects', 'scholarship search'],
                    responses: [
                        'Active recall > passive reading: Test yourself with flashcards. Need help creating a study schedule?',
                        'The Pomodoro technique (25min study/5min break) works great for finals. What subject are you tackling?',
                        'Pro tip: Record lectures (with permission) and listen at 1.5x speed. Struggling with any specific class?'
                    ]
                },
            
                senior_care: {
                    patterns: ['aging parents', 'assisted living', 'medication reminders', 'elderly nutrition', 'mobility aids', 'memory care', 'social security', 'senior activities'],
                    responses: [
                        'Pill organizers with AM/PM compartments help with meds. Need local pharmacy delivery options?',
                        'Chair yoga and water aerobics are great low-impact exercises. What mobility level are we considering?',
                        'Meal delivery services like Meals on Wheels can help. Any specific dietary restrictions?'
                    ]
                },
            
                wedding_planning: {
                    patterns: ['wedding budget', 'venue ideas', 'guest list tips', 'wedding dress', 'honeymoon destinations', 'save the dates', 'wedding stress', 'marriage license'],
                    responses: [
                        'Prioritize 3 non-negotiables (photos, food, etc.), then compromise elsewhere. What\'s your total budget?',
                        'Off-season (Jan-Mar) and weekdays can save 20-30% on venues. Have a preferred season/location?',
                        'Pro tip: Create a wedding email address to keep all vendor communication separate. Need checklist help?'
                    ]
                },
            
                grief_support: {
                    patterns: ['coping with loss', 'grief stages', 'sympathy gifts', 'what to say', 'pet loss', 'funeral planning', 'bereavement leave', 'grief counseling'],
                    responses: [
                        'There\'s no timeline for grief. Would you like resources for local support groups?',
                        'Simple acknowledgments ("I\'m here for you") often mean more than advice. Need help finding counseling?',
                        'Memorializing helps some people: planting trees, memory books. Want to share about your loved one?'
                    ]
                },
            
                home_office: {
                    patterns: ['ergonomic setup', 'zoom background', 'work from home tips', 'remote work tools', 'video call etiquette', 'productivity apps', 'hybrid work', 'standing desk'],
                    responses: [
                        'Your monitor should be at eye level, 20-30 inches away. Need affordable ergonomic chair recommendations?',
                        'Natural light in front of you (not behind) makes video calls clearer. Setting up a new workspace?',
                        'Pro tip: Use virtual backgrounds with neutral colors for professional calls. Need software suggestions?'
                    ]
                },
            
                first_aid: {
                    patterns: ['CPR steps', 'treat burns', 'allergic reaction', 'sprained ankle', 'nose bleed', 'choking adult', 'fever reduction', 'poison control'],
                    responses: [
                        'For minor burns: Cool running water for 10 mins, no ice/butter. Is it larger than your palm? Seek ER.',
                        'Recovery position for unconscious breathing: On side, head tilted, top knee bent. Need diagram?',
                        'For choking: Give 5 back blows between shoulder blades, then 5 abdominal thrusts. Should I connect you to emergency services?'
                    ]
                },
            
                cultural_etiquette: {
                    patterns: ['business etiquette', 'table manners', 'gift giving customs', 'greeting traditions', 'cultural norms', 'taboos to avoid', 'international travel', 'religious customs'],
                    responses: [
                        'In Japan: Present gifts with both hands, avoid wrapping in white. Planning business travel there?',
                        'Middle East: Eat only with your right hand, left is considered unclean. Need country-specific tips?',
                        'Brazilian meetings often start late, but you should arrive on time. What culture are you researching?'
                    ]
                },
            
                outdoor_survival: {
                    patterns: ['build shelter', 'purify water', 'edible plants', 'bear encounter', 'lost in woods', 'knot tying', 'weather emergency', 'survival kit'],
                    responses: [
                        'Rule of 3s: 3 mins without air, 3 hours without shelter, 3 days without water. Preparing for a trip?',
                        'For water: Boil 1 minute (3 mins at altitude), or use iodine tablets. Need backpacking checklist?',
                        'If lost: STOP (Stay, Think, Observe, Plan). Do you have a compass/map where you are?'
                    ]
                }
            
    
    
    };
    

    // User interaction history
    let interactionHistory = [];
    
    // Learning parameters
    let learningRate = 0.8;
    let similarityThreshold = 0.7; // Increased from 0.5 to require better matches
    
    // Common stopwords to ignore in matching
    const stopwords = new Set(['the', 'a', 'an', 'is', 'are', 'i', 'you', 'we', 'to', 'of', 'in', 'it', 'that', 'for']);
    
    // Send message when button is clicked
    sendButton.addEventListener('click', sendMessage);
    
    // Send message when Enter key is pressed
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Function to send user message
    function sendMessage() {
        const userInput = messageInput.value.trim();
        if (userInput === '') return;
        
        // Add user message to chat
        addMessage(userInput, 'user');
        messageInput.value = '';
        
        // Process the message and get response
        setTimeout(() => {
            const botResponse = processUserInput(userInput);
            addMessage(botResponse, 'bot');
            
            // Add feedback buttons to the latest bot message
            addFeedbackButtons();
            
            // Learn from the interaction
            learnFromInteraction(userInput, botResponse);
        }, 500);
    }
    
function calculateSimilarity(str1, str2) {
    // Tokenize and remove stopwords
    const tokenize = (str) => 
        str.toLowerCase()
           .split(/\s+/)
           .filter(word => word.length > 2 && !stopwords.has(word));
    
    // New: Implement stemming or lemmatization here if needed

    // Check for exact match first

        // Tokenize and remove stopwords
        const tokensize = (str) => 
            str.toLowerCase()
               .split(/\s+/)
               .filter(word => word.length > 2 && !stopwords.has(word));
        
        const words1 = tokensize(str1);
        const words2 = tokensize(str2);
        
        // Check for exact match first
        if (str1.toLowerCase() === str2.toLowerCase()) return 1.0;
        
        // Check if all words in pattern exist in input (strict matching)
        const allWordsMatch = words2.every(w => words1.includes(w));
        if (allWordsMatch) return 0.9; // Very strong match
        
        // Check if any word in pattern is contained in input
        const anyWordContained = words2.some(w => str1.toLowerCase().includes(w));
        if (!anyWordContained) return 0; // No match at all
        
        // Calculate Jaccard similarity (word overlap)
        const intersection = words1.filter(word => words2.includes(word)).length;
        const union = new Set([...words1, ...words2]).size;
        
        return union > 0 ? intersection / union : 0;
    }
    
    // Enhanced function to process user input
    function processUserInput(input) {
        // Debug output
        console.log(`Processing input: "${input}"`);
        
        // Normalize input
        const normalizedInput = input.toLowerCase();
        
        // First check for exact matches
        for (const intent in knowledgeBase) {
            if (intent === 'fallback') continue;
            
            if (knowledgeBase[intent].patterns.some(
                pattern => pattern.toLowerCase() === normalizedInput
            )) {
                console.log(`Exact match found in intent: ${intent}`);
                const responses = knowledgeBase[intent].responses;
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }
        
        // Find the best matching intent
        let bestMatch = null;
        let highestScore = 0;
        let bestPattern = null;
        
        for (const intent in knowledgeBase) {
            if (intent === 'fallback') continue;
            
            for (const pattern of knowledgeBase[intent].patterns) {
                const similarity = calculateSimilarity(input, pattern);
                
                if (similarity > highestScore) {
                    highestScore = similarity;
                    bestMatch = intent;
                    bestPattern = pattern;
                }
            }
        }
        
        console.log(`Best match: ${bestMatch} (score: ${highestScore}) with pattern: "${bestPattern}"`);
        
        // If we found a good match, return a response from that intent
        if (bestMatch && highestScore >= similarityThreshold) {
            const responses = knowledgeBase[bestMatch].responses;
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        // Check if there's any similar question in the interaction history
        for (const interaction of interactionHistory) {
            const similarity = calculateSimilarity(input, interaction.userInput.toLowerCase());
            if (similarity > similarityThreshold) {
                console.log(`Found similar historical interaction with score: ${similarity}`);
                return interaction.botResponse;
            }
        }
        
        // Otherwise, return a fallback response
        console.log('No good match found, using fallback');
        const fallbackResponses = knowledgeBase.fallback.responses;
        return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    }
    
    // Function to add a message to the chat
    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(sender + '-message');
        messageElement.textContent = message;
        chatBody.appendChild(messageElement);
        
        // Scroll to the bottom
        chatBody.scrollTop = chatBody.scrollHeight;
    }
    
    // Function to add feedback buttons to bot messages
    function addFeedbackButtons() {
        const latestBotMessage = chatBody.lastElementChild;
        const feedbackContainer = document.createElement('div');
        feedbackContainer.classList.add('feedback-buttons');
        
        const thumbsUpButton = document.createElement('button');
        thumbsUpButton.classList.add('feedback-button');
        thumbsUpButton.innerHTML = '👍';
        thumbsUpButton.addEventListener('click', () => provideFeedback(true));
        
        const thumbsDownButton = document.createElement('button');
        thumbsDownButton.classList.add('feedback-button');
        thumbsDownButton.innerHTML = '👎';
        thumbsDownButton.addEventListener('click', () => provideFeedback(false));
        
        feedbackContainer.appendChild(thumbsUpButton);
        feedbackContainer.appendChild(thumbsDownButton);
        
        latestBotMessage.appendChild(feedbackContainer);
    }
    
    // Function to learn from user interaction
    function learnFromInteraction(userInput, botResponse) {
        interactionHistory.push({
            userInput: userInput,
            botResponse: botResponse,
            timestamp: new Date(),
            feedback: null
        });
        
        // Show learning indicator
        learningIndicator.style.display = 'block';
        learningIndicator.textContent = 'Learning...';
        
        // Simulate learning process
        setTimeout(() => {
            learningIndicator.style.display = 'none';
        }, 2000);
    }
    
function provideFeedback(isPositive) {
    const lastinteraction = interactionHistory[interactionHistory.length - 1];
    lastInteraction.feedback = isPositive;
    
    // New: Allow users to provide specific feedback on responses
    if (!isPositive) {
        // Show learning indicator
        learningIndicator.style.display = 'block';
        learningIndicator.textContent = 'Improving...';
        
        // Create a new intent if this is a repeated negative feedback
        const similarInputs = interactionHistory.filter(
            interaction => calculateSimilarity(interaction.userInput.toLowerCase(), lastInteraction.userInput.toLowerCase()) > 0.7
        );
        
        const negativeCount = similarInputs.filter(interaction => interaction.feedback === false).length;
        
        if (negativeCount >= 2) {
            // Prompt user for better response
            setTimeout(() => {
                addMessage("I'm still learning. How would you prefer I respond to that?", 'bot');
                
                // Create a temporary event listener for the next user message
                const tempListener = function() {
                    const betterResponse = messageInput.value.trim();
                    if (betterResponse === '') return;
                    
                    // Add user message to chat
                    addMessage(betterResponse, 'user');
                    messageInput.value = '';
                    
                    // Create or update knowledge base with this new information
                    updateKnowledgeBase(lastInteraction.userInput, betterResponse);
                    
                    // Remove this temporary listener
                    sendButton.removeEventListener('click', tempListener);
                    // Restore original listener
                    sendButton.addEventListener('click', sendMessage);
                    
                    // Add thank you message
                    setTimeout(() => {
                        addMessage("Thank you for teaching me! I'll remember that next time.", 'bot');
                    }, 500);
                };
                
                // Replace the current event listener
                sendButton.removeEventListener('click', sendMessage);
                sendButton.addEventListener('click', tempListener);
            }, 500);
        }
        
        setTimeout(() => {
            learningIndicator.style.display = 'none';
        }, 2000);
    }

        const lastInteraction = interactionHistory[interactionHistory.length - 1];
        lastInteraction.feedback = isPositive;
        
        // Update learning parameters if negative feedback
        if (!isPositive) {
            // Show learning indicator
            learningIndicator.style.display = 'block';
            learningIndicator.textContent = 'Improving...';
            
            // Create a new intent if this is a repeated negative feedback
            const similarInputs = interactionHistory.filter(
                interaction => calculateSimilarity(interaction.userInput.toLowerCase(), lastInteraction.userInput.toLowerCase()) > 0.7
            );
            
            const negativeCount = similarInputs.filter(interaction => interaction.feedback === false).length;
            
            if (negativeCount >= 2) {
                // Prompt user for better response
                setTimeout(() => {
                    addMessage("I'm still learning. How would you prefer I respond to that?", 'bot');
                    
                    // Create a temporary event listener for the next user message
                    const tempListener = function() {
                        const betterResponse = messageInput.value.trim();
                        if (betterResponse === '') return;
                        
                        // Add user message to chat
                        addMessage(betterResponse, 'user');
                        messageInput.value = '';
                        
                        // Create or update knowledge base with this new information
                        updateKnowledgeBase(lastInteraction.userInput, betterResponse);
                        
                        // Remove this temporary listener
                        sendButton.removeEventListener('click', tempListener);
                        // Restore original listener
                        sendButton.addEventListener('click', sendMessage);
                        
                        // Add thank you message
                        setTimeout(() => {
                            addMessage("Thank you for teaching me! I'll remember that next time.", 'bot');
                        }, 500);
                    };
                    
                    // Replace the current event listener
                    sendButton.removeEventListener('click', sendMessage);
                    sendButton.addEventListener('click', tempListener);
                }, 500);
            }
            
            setTimeout(() => {
                learningIndicator.style.display = 'none';
            }, 2000);
        }
    }
    
    // Function to update knowledge base with new information
    function updateKnowledgeBase(userInput, preferredResponse) {
        // Normalize input
        const normalizedInput = userInput.toLowerCase();
        
        // Look for the most similar intent
        let bestMatch = null;
        let highestScore = 0;
        
        for (const intent in knowledgeBase) {
            if (intent === 'fallback') continue;
            
            const patterns = knowledgeBase[intent].patterns;
            for (const pattern of patterns) {
                const similarity = calculateSimilarity(normalizedInput, pattern);
                
                if (similarity > highestScore) {
                    highestScore = similarity;
                    bestMatch = intent;
                }
            }
        }
        
        // If similar intent exists with high similarity, add to it
        if (bestMatch && highestScore > 0.7) {
            // Add the user input as a new pattern
            if (!knowledgeBase[bestMatch].patterns.includes(normalizedInput)) {
                knowledgeBase[bestMatch].patterns.push(normalizedInput);
            }
            
            // Add the preferred response if it's not already there
            if (!knowledgeBase[bestMatch].responses.includes(preferredResponse)) {
                knowledgeBase[bestMatch].responses.push(preferredResponse);
            }
        } else {
            // Create a new intent
            const newIntentName = 'learned_' + Object.keys(knowledgeBase).length;
            knowledgeBase[newIntentName] = {
                patterns: [normalizedInput],
                responses: [preferredResponse]
            };
        }
        
        // Save to localStorage for persistence
        localStorage.setItem('chatbotKnowledgeBase', JSON.stringify(knowledgeBase));
    }
    
    // Load saved knowledge base if available
    if (localStorage.getItem('chatbotKnowledgeBase')) {
        try {
            knowledgeBase = JSON.parse(localStorage.getItem('chatbotKnowledgeBase'));
        } catch (e) {
            console.error("Error loading saved knowledge base:", e);
        }
    }
});
