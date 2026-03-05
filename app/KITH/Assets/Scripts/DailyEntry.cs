using UnityEngine;
using UnityEngine.UI;

public class DailyEntryManager : MonoBehaviour
{
    public string selectedMood;

    // Call this from the Mood Buttons (Happy, Sad, Neutral)
    public void SelectMood(string mood)
    {
        selectedMood = mood;
        Debug.Log("Patient felt: " + mood);
        SaveMoodData(mood);
    }

    private void SaveMoodData(string mood)
    {
        // For now, we use PlayerPrefs to store the mood locally
        // The Caretaker Dashboard will read this to update the graphs
        PlayerPrefs.SetString("LastMood", mood);
        PlayerPrefs.Save();
    }

    public void SubmitEntry()
    {
        // Move to the next scene (e.g., Record Memory)
        FindFirstObjectByType<SceneLoader>().LoadPatientHome();
    }
}