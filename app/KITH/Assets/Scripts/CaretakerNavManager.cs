using UnityEngine;
using UnityEngine.SceneManagement;

public class CaretakerNavManager : MonoBehaviour
{
    // Assign these in the Inspector to match your Scene names
    public void OpenPairingSystem() => SceneManager.LoadScene("20_Caretak..."); 
    public void OpenDashboard() => SceneManager.LoadScene("21_Caretake...");
    public void OpenGuide() => SceneManager.LoadScene("CT_Guide_Scene"); // Create this scene
    public void OpenSettings() => SceneManager.LoadScene("22_Caretak...");

    // Logic for Switch Patient button in Settings
    public void SwitchPatient()
    {
        Debug.Log("Resetting Patient ID...");
        PlayerPrefs.DeleteKey("CurrentPatientID");
        SceneManager.LoadScene("01_ModeSel");
    }
}
