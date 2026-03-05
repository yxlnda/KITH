using UnityEngine;

public class SupportResourceManager : MonoBehaviour
{
    // Link to dementia research/articles
    public void OpenResearchLink()
    {
        Application.OpenURL("https://www.alz.org/help-support/caregiving"); 
    }

    // Link to join a community/forum
    public void OpenCommunityGroup()
    {
        Application.OpenURL("https://www.facebook.com/groups/dementiacaregivers");
    }
}