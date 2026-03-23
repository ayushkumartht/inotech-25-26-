import os
import json
import praw
import instaloader
import urllib.request
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

# --- Configuration ---
REDDIT_SUBS = ["Delhi", "india", "IndianVideos", "indiasocial", "bollywood", "indiancreators"]
INSTA_TARGETS = ["the_luxury_scene", "techcrunch", "streetfoodrecipe", "beebomco"] # Sample targets for trends

def scrape_reddit():
    print("Scraping Reddit...")
    try:
        # Use credentials from env if available
        client_id = os.getenv("REDDIT_CLIENT_ID")
        client_secret = os.getenv("REDDIT_CLIENT_SECRET")
        user_agent = os.getenv("REDDIT_USER_AGENT", "TrendPredictPro/1.0")
        
        if not client_id or not client_secret:
            print("Missing Reddit credentials, using public JSON fallback.")
            signals = []
            headers = {'User-Agent': 'TrendPredictPro/1.0'}
            for sub_name in REDDIT_SUBS:
                try:
                    url = f"https://www.reddit.com/r/{sub_name}/hot.json?limit=30"
                    req = urllib.request.Request(url, headers=headers)
                    with urllib.request.urlopen(req) as response:
                        data = json.loads(response.read().decode())
                        for child in data.get('data', {}).get('children', []):
                            post = child.get('data', {})
                            signals.append({
                                "title": post.get('title', ""),
                                "upvotes": post.get('score', 0),
                                "comments": post.get('num_comments', 0),
                                "subreddit": sub_name,
                                "url": post.get('url', "")
                            })
                    print(f"Fetched r/{sub_name}")
                except Exception as sub_e:
                    print(f"Error fetching r/{sub_name}: {sub_e}")
            
            with open("reddit_cache.json", "w") as f:
                json.dump(signals, f, indent=2)
            return signals

        reddit = praw.Reddit(
            client_id=client_id,
            client_secret=client_secret,
            user_agent=user_agent
        )
        
        signals = []
        for sub_name in REDDIT_SUBS:
            subreddit = reddit.subreddit(sub_name)
            for post in subreddit.hot(limit=30):
                signals.append({
                    "title": post.title,
                    "upvotes": post.score,
                    "comments": post.num_comments,
                    "subreddit": sub_name,
                    "url": post.url
                })
        
        with open("reddit_cache.json", "w") as f:
            json.dump(signals, f, indent=2)
        return signals
    except Exception as e:
        print(f"Reddit error: {e}")
        return []

def scrape_instagram():
    print("Scraping Instagram...")
    L = instaloader.Instaloader()
    username = os.getenv("INSTAGRAM_USERNAME")
    password = os.getenv("INSTAGRAM_PASSWORD")
    
    if username and password:
        try:
            L.login(username, password)
        except Exception as e:
            print(f"Instaloader login failed: {e}")
    
    posts_data = []
    analysis = {
        "total_posts_analyzed": 0,
        "top_hashtags": [],
        "content_type_distribution": {},
        "avg_likes": 0,
        "avg_comments": 0,
        "top_performing_posts": [],
        "profiles_scraped": INSTA_TARGETS
    }
    
    total_likes = 0
    total_comments = 0
    hashtag_counts = {}
    
    try:
        for target in INSTA_TARGETS:
            print(f"Profile: {target}")
            profile = instaloader.Profile.from_username(L.context, target)
            count = 0
            for post in profile.get_posts():
                if count >= 5: break # limit per profile
                
                post_info = {
                    "owner": target,
                    "caption": post.caption or "",
                    "hashtags": list(post.caption_hashtags),
                    "likes": post.likes,
                    "comments": post.comments,
                    "content_type": "video" if post.is_video else "image",
                    "source_profile": target,
                    "url": post.url
                }
                posts_data.append(post_info)
                
                # Analysis data
                total_likes += post.likes
                total_comments += post.comments
                for tag in post.caption_hashtags:
                    hashtag_counts[tag] = hashtag_counts.get(tag, 0) + 1
                
                analysis["content_type_distribution"][post_info["content_type"]] = analysis["content_type_distribution"].get(post_info["content_type"], 0) + 1
                
                count += 1
        
        analysis["total_posts_analyzed"] = len(posts_data)
        if posts_data:
            analysis["avg_likes"] = total_likes // len(posts_data)
            analysis["avg_comments"] = total_comments // len(posts_data)
        
        # Sort hashtags
        sorted_tags = sorted(hashtag_counts.items(), key=lambda x: x[1], reverse=True)
        analysis["top_hashtags"] = [{"tag": k, "count": v} for k, v in sorted_tags[:20]]
        
        # Top performing
        analysis["top_performing_posts"] = sorted(posts_data, key=lambda x: x["likes"] + x["comments"] * 2, reverse=True)[:10]
        
        data = {
            "success": True,
            "posts": posts_data,
            "analysis": analysis,
            "updated_at": datetime.now().isoformat()
        }
        
        with open("insta_cache.json", "w") as f:
            json.dump(data, f, indent=2)
        return data
    except Exception as e:
        print(f"Instagram error: {e}")
        return None

if __name__ == "__main__":
    scrape_reddit()
    scrape_instagram()
    print("Scraping complete.")
