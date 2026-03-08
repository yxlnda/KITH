using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class DashboardAnalytics : MonoBehaviour
{
    [Header("Donut Graph (Daily)")]
    public Image happyFill;   // Set Image Type to 'Filled' and Method to 'Radial 360'
    public Image neutralFill;
    public Image sadFill;

    [Header("Status Text")]
    public TextMeshProUGUI patientStatusText;

    void Start()
    {
        DisplayMoodStats();
    }

    public void DisplayMoodStats()
    {
        // In a real app, calculate percentages from a database
        // Example: 60% Happy, 20% Neutral, 20% Sad
        happyFill.fillAmount = 0.6f; 
        neutralFill.fillAmount = 0.8f; // Layered: (Happy + Neutral)
        sadFill.fillAmount = 1.0f;     // Layered: (All)

        patientStatusText.text = "Patient is feeling mostly Joyful today.";
    }
}
