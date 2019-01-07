package edu.northeastern.cs5200.daos;

import java.io.IOException;
import okhttp3.*;
import okhttp3.Request.Builder;
import org.json.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="http://localhost:3000",allowCredentials="true",allowedHeaders="*")
public class YelpSample1 {
	
	@GetMapping("/api/yelpdata/{term}/{location}")
	public String getData(@PathVariable("term") String term,@PathVariable("location") String location) throws JSONException {
		 String accessToken="eHgVzGk_vB4Y_U_I4Cipo4aYSyj4CmEFgLfQcmYiGUhED9l5Abjfz9cnuEm9aK23-9QyH6RhhhbRk5y3ly6g_bMrehrcyB-2YxcuozOHBztqmCt2p1a_N05mxN3UW3Yx";
         
         OkHttpClient client2 = new OkHttpClient();


         Request request2 = new Builder()
                 .url("https://api.yelp.com/v3/businesses/search?term=" + term + "&location=" + location)
                 .get()
                 .addHeader("authorization", "Bearer"+" "+accessToken)
                 .addHeader("cache-control", "no-cache")
                 .addHeader("postman-token", "b5fc33ce-3dad-86d7-6e2e-d67e14e8071b")
                 .build();
         
         try {
             Response response2 = client2.newCall(request2).execute();

             JSONObject jsonObject = new JSONObject(response2.body().string().trim());       // parser
             JSONArray myResponse = (JSONArray)jsonObject.get("businesses");
            
             JSONObject res = new JSONObject();
             res.put("Yelp", myResponse);
             return res.toString();

         } catch (IOException e) {
            
             e.printStackTrace();
         }
         return null;
	}
	
	@GetMapping("/api/yelpdata/businesses/{id}")
	public String getRestaurants(@PathVariable("id") String id) throws JSONException{
		String accessToken="eHgVzGk_vB4Y_U_I4Cipo4aYSyj4CmEFgLfQcmYiGUhED9l5Abjfz9cnuEm9aK23-9QyH6RhhhbRk5y3ly6g_bMrehrcyB-2YxcuozOHBztqmCt2p1a_N05mxN3UW3Yx";
        
        OkHttpClient client2 = new OkHttpClient();


        Request request2 = new Builder()
                .url("https://api.yelp.com/v3/businesses/"+id)
                .get()
                .addHeader("authorization", "Bearer"+" "+accessToken)
                .addHeader("cache-control", "no-cache")
                .addHeader("postman-token", "b5fc33ce-3dad-86d7-6e2e-d67e14e8071b")
                .build();
        
        try {
            Response response2 = client2.newCall(request2).execute();

            JSONObject jsonObject = new JSONObject(response2.body().string().trim());       // parser
            ;
            return jsonObject.toString();

        } catch (IOException e) {
           
            e.printStackTrace();
        }
        return null;
	}
	
}
