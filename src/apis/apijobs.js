import supaBaseClient from "@/utils/supabase";

export async function getJobs(token, { alreadySaved }, saveData) {
  let query = supabase.from("jobs").select("*");

  if (location) {
    query = query.eq("location", location);
  }

  if (company_id) {
    query = query.eq("company_id", company_id);
  }
  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }
  const { data, error } = await query;
  if (error) {
    console.log("error to fetch jobs");
    console.log(error);
  }

  return data;
}

export async function savedJob(token, { location, company_id, searchQuery }) {
  const supabase = await supaBaseClient(token);
  if (alreadySaved) {
    const { data, error: deleteError } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveData.job_id);

    if (deleteError) {
      console.log("error deleting saved job : ", deleteError);
      return null;
    }
    return data;
  } else {
    const { data, error: insertError } = await supabase
      .from("saved_jobs")
      .insert([saveData])
      .select();

    if (insertError) {
      console.log("error fetching  job : ", insertError);
      return null;
    }
    return data;
  }
}
