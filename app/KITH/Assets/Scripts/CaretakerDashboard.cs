using UnityEngine;
using TMPro;

public class CaretakerDashboard : MonoBehaviour
{
    public TextMeshProUGUI patientStatusText;

    void Start()
    {
        UpdateDashboard();
    }

    public void UpdateDashboard()
    {
        string lastMood = PlayerPrefs.GetString("LastMood", "No data yet");
        patientStatusText.text = "Today's Status: " + lastMood;
        
        // Note: For a visual  
        // update the 'Fill Amount' of a UI Image (Radial) 
        // based on a percentage of Happy vs Sad entries.
    }
}