import json
import pandas as pd
import numpy as np

df = pd.read_csv('US_youtube_trending_data_sentiment.csv')

df.info()

df['category'].value_counts()

dfTest = df
dfTest.info()

mean_view = dfTest['view_count'].median()
mean_comment = dfTest['comment_count'].median()
mean_votes = (dfTest['likes'] + dfTest['dislikes']).median()

dfTest['popularity'] = np.where((dfTest['view_count'] > mean_view) & (dfTest['comment_count'] > mean_comment) & ((dfTest['likes'] + dfTest['dislikes']) > mean_votes), True, False)

for i, row in dfTest.iterrows():
    dfTest.at[i,'publishedAt'] = df[i]

dfTest.to_csv('US_youtube_trending_data_popularity.csv', index=False)